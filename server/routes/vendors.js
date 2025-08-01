import express from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { Payment } from '../models/Payment.js';

const router = express.Router();

// Middleware to verify JWT token and vendor role
const authenticateVendor = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);
    
    if (!user || user.role !== 'vendor') {
      return res.status(403).json({ error: 'Vendor access required' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Get vendor dashboard
router.get('/dashboard', authenticateVendor, async (req, res) => {
  try {
    const totalSales = await Payment.sum('amount', {
      where: { 
        status: 'completed',
        vendorId: req.user.id
      }
    });

    const totalOrders = await Payment.count({
      where: { 
        status: 'completed',
        vendorId: req.user.id
      }
    });

    const pendingOrders = await Payment.count({
      where: { 
        status: 'pending',
        vendorId: req.user.id
      }
    });

    const recentOrders = await Payment.findAll({
      where: { vendorId: req.user.id },
      include: [{ model: User, attributes: ['firstName', 'lastName', 'email'] }],
      order: [['createdAt', 'DESC']],
      limit: 10
    });

    res.json({
      stats: {
        totalSales: totalSales || 0,
        totalOrders,
        pendingOrders
      },
      recentOrders
    });
  } catch (error) {
    console.error('Error fetching vendor dashboard:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Get vendor orders
router.get('/orders', authenticateVendor, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const status = req.query.status;

    const whereClause = { vendorId: req.user.id };
    if (status) {
      whereClause.status = status;
    }

    const { count, rows: orders } = await Payment.findAndCountAll({
      where: whereClause,
      include: [{ model: User, attributes: ['firstName', 'lastName', 'email'] }],
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });

    res.json({
      orders,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Error fetching vendor orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Update order status
router.put('/orders/:id/status', authenticateVendor, [
  body('status').isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const orderId = req.params.id;
    const { status } = req.body;

    const order = await Payment.findOne({
      where: { 
        id: orderId,
        vendorId: req.user.id
      }
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await order.update({ status });
    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// Get vendor profile
router.get('/profile', authenticateVendor, async (req, res) => {
  try {
    const vendor = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    
    res.json(vendor);
  } catch (error) {
    console.error('Error fetching vendor profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update vendor profile
router.put('/profile', authenticateVendor, [
  body('firstName').optional().isLength({ min: 1 }).trim().escape(),
  body('lastName').optional().isLength({ min: 1 }).trim().escape(),
  body('email').optional().isEmail().normalizeEmail(),
  body('phone').optional().isMobilePhone(),
  body('address').optional().trim().escape(),
  body('city').optional().trim().escape(),
  body('state').optional().trim().escape(),
  body('country').optional().trim().escape(),
  body('postalCode').optional().trim().escape(),
  body('businessName').optional().trim().escape(),
  body('businessDescription').optional().trim().escape()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const vendor = await User.findByPk(req.user.id);
    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    // Update vendor fields
    const updateFields = {};
    const allowedFields = [
      'firstName', 'lastName', 'email', 'phone', 'address', 
      'city', 'state', 'country', 'postalCode', 'businessName', 'businessDescription'
    ];
    
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateFields[field] = req.body[field];
      }
    });

    await vendor.update(updateFields);
    
    const updatedVendor = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    
    res.json(updatedVendor);
  } catch (error) {
    console.error('Error updating vendor profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Get vendor earnings
router.get('/earnings', authenticateVendor, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const whereClause = {
      vendorId: req.user.id,
      status: 'completed'
    };

    if (startDate && endDate) {
      whereClause.createdAt = {
        [sequelize.Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    const totalEarnings = await Payment.sum('amount', { where: whereClause });
    const totalOrders = await Payment.count({ where: whereClause });

    const monthlyEarnings = await Payment.findAll({
      attributes: [
        [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%Y-%m'), 'month'],
        [sequelize.fn('SUM', sequelize.col('amount')), 'total'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'orders']
      ],
      where: whereClause,
      group: [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%Y-%m')],
      order: [[sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%Y-%m'), 'DESC']],
      limit: 12
    });

    res.json({
      totalEarnings: totalEarnings || 0,
      totalOrders,
      monthlyEarnings
    });
  } catch (error) {
    console.error('Error fetching vendor earnings:', error);
    res.status(500).json({ error: 'Failed to fetch earnings' });
  }
});

export default router; 