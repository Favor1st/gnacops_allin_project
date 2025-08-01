import express from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { Payment } from '../models/Payment.js';
import { Settings } from '../models/Settings.js';

const router = express.Router();

// Middleware to verify JWT token and admin role
const authenticateAdmin = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);
    
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Get admin dashboard statistics
router.get('/dashboard', authenticateAdmin, async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalPayments = await Payment.count();
    const totalRevenue = await Payment.sum('amount', {
      where: { status: 'completed' }
    });

    const recentUsers = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
      limit: 5
    });

    const recentPayments = await Payment.findAll({
      include: [{ model: User, attributes: ['firstName', 'lastName', 'email'] }],
      order: [['createdAt', 'DESC']],
      limit: 5
    });

    res.json({
      stats: {
        totalUsers,
        totalPayments,
        totalRevenue: totalRevenue || 0
      },
      recentUsers,
      recentPayments
    });
  } catch (error) {
    console.error('Error fetching admin dashboard:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Get all users with pagination
router.get('/users', authenticateAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows: users } = await User.findAndCountAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });

    res.json({
      users,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Update user role
router.put('/users/:id/role', authenticateAdmin, [
  body('role').isIn(['user', 'admin', 'vendor'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.params.id;
    const { role } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.update({ role });
    
    const updatedUser = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });
    
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ error: 'Failed to update user role' });
  }
});

// Get all payments with pagination
router.get('/payments', authenticateAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows: payments } = await Payment.findAndCountAll({
      include: [{ model: User, attributes: ['firstName', 'lastName', 'email'] }],
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });

    res.json({
      payments,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});

// Get payment statistics
router.get('/payments/stats', authenticateAdmin, async (req, res) => {
  try {
    const totalPayments = await Payment.count();
    const completedPayments = await Payment.count({ where: { status: 'completed' } });
    const pendingPayments = await Payment.count({ where: { status: 'pending' } });
    const failedPayments = await Payment.count({ where: { status: 'failed' } });
    
    const totalRevenue = await Payment.sum('amount', {
      where: { status: 'completed' }
    });

    const monthlyRevenue = await Payment.findAll({
      attributes: [
        [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%Y-%m'), 'month'],
        [sequelize.fn('SUM', sequelize.col('amount')), 'total']
      ],
      where: { status: 'completed' },
      group: [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%Y-%m')],
      order: [[sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%Y-%m'), 'DESC']],
      limit: 12
    });

    res.json({
      stats: {
        totalPayments,
        completedPayments,
        pendingPayments,
        failedPayments,
        totalRevenue: totalRevenue || 0
      },
      monthlyRevenue
    });
  } catch (error) {
    console.error('Error fetching payment statistics:', error);
    res.status(500).json({ error: 'Failed to fetch payment statistics' });
  }
});

// Update payment status
router.put('/payments/:id/status', authenticateAdmin, [
  body('status').isIn(['pending', 'completed', 'failed', 'cancelled'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const paymentId = req.params.id;
    const { status } = req.body;

    const payment = await Payment.findByPk(paymentId);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    await payment.update({ status });
    res.json(payment);
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ error: 'Failed to update payment status' });
  }
});

// Get system settings
router.get('/settings', authenticateAdmin, async (req, res) => {
  try {
    const settings = await Settings.findAll();
    const settingsObject = {};
    
    settings.forEach(setting => {
      settingsObject[setting.key] = setting.value;
    });
    
    res.json(settingsObject);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// Update system settings
router.put('/settings', authenticateAdmin, async (req, res) => {
  try {
    const updates = req.body;
    
    for (const [key, value] of Object.entries(updates)) {
      await Settings.upsert({ key, value });
    }
    
    res.json({ message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

export default router; 