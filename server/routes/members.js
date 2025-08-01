import express from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { Payment } from '../models/Payment.js';
import { Application } from '../models/Application.js';
import { Certificate } from '../models/Certificate.js';
import { sequelize } from '../database/config.js';
import { Parser } from 'json2csv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Get all members with pagination and filters
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    const status = req.query.status || 'all';
    const type = req.query.type || 'all';

    const whereClause = {};
    
    if (search) {
      whereClause[sequelize.Op.or] = [
        { firstName: { [sequelize.Op.like]: `%${search}%` } },
        { lastName: { [sequelize.Op.like]: `%${search}%` } },
        { email: { [sequelize.Op.like]: `%${search}%` } },
        { membershipNumber: { [sequelize.Op.like]: `%${search}%` } }
      ];
    }

    if (status !== 'all') {
      whereClause.status = status;
    }

    if (type !== 'all') {
      whereClause.membershipType = type;
    }

    const { count, rows: members } = await User.findAndCountAll({
      where: whereClause,
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
      limit,
      offset,
      include: [
        {
          model: Payment,
          as: 'payments',
          attributes: ['amount', 'status', 'createdAt'],
          limit: 1,
          order: [['createdAt', 'DESC']]
        }
      ]
    });

    res.json({
      members,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

// Get member details
router.get('/:id', authenticateAdmin, async (req, res) => {
  try {
    const memberId = req.params.id;
    
    const member = await User.findByPk(memberId, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Payment,
          as: 'payments',
          order: [['createdAt', 'DESC']]
        },
        {
          model: Application,
          as: 'applications',
          order: [['createdAt', 'DESC']]
        },
        {
          model: Certificate,
          as: 'certificates',
          order: [['issuedAt', 'DESC']]
        }
      ]
    });

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.json(member);
  } catch (error) {
    console.error('Error fetching member details:', error);
    res.status(500).json({ error: 'Failed to fetch member details' });
  }
});

// Update member status
router.put('/:id/status', authenticateAdmin, [
  body('status').isIn(['active', 'inactive', 'pending', 'suspended'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const memberId = req.params.id;
    const { status, reason } = req.body;

    const member = await User.findByPk(memberId);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    await member.update({ status });

    // Log the status change
    console.log(`Member ${memberId} status changed to ${status} by admin ${req.user.id}`);

    res.json({
      success: true,
      message: `Member status updated to ${status}`,
      member: {
        id: member.id,
        name: `${member.firstName} ${member.lastName}`,
        status: member.status
      }
    });
  } catch (error) {
    console.error('Error updating member status:', error);
    res.status(500).json({ error: 'Failed to update member status' });
  }
});

// Update member information
router.put('/:id', authenticateAdmin, [
  body('firstName').optional().isLength({ min: 1 }).trim().escape(),
  body('lastName').optional().isLength({ min: 1 }).trim().escape(),
  body('email').optional().isEmail().normalizeEmail(),
  body('phone').optional().isMobilePhone(),
  body('address').optional().trim().escape(),
  body('city').optional().trim().escape(),
  body('state').optional().trim().escape(),
  body('country').optional().trim().escape(),
  body('postalCode').optional().trim().escape(),
  body('membershipType').optional().isIn(['Teacher Council', 'Parent Council', 'Institutional', 'Proprietor']),
  body('membershipNumber').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const memberId = req.params.id;
    const updateData = req.body;

    const member = await User.findByPk(memberId);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    // Check if email is being changed and if it's already taken
    if (updateData.email && updateData.email !== member.email) {
      const existingUser = await User.findOne({ where: { email: updateData.email } });
      if (existingUser && existingUser.id !== memberId) {
        return res.status(400).json({ error: 'Email already exists' });
      }
    }

    await member.update(updateData);

    const updatedMember = await User.findByPk(memberId, {
      attributes: { exclude: ['password'] }
    });

    res.json({
      success: true,
      message: 'Member information updated successfully',
      member: updatedMember
    });
  } catch (error) {
    console.error('Error updating member:', error);
    res.status(500).json({ error: 'Failed to update member' });
  }
});

// Delete member (soft delete)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const memberId = req.params.id;
    const { reason } = req.body;

    const member = await User.findByPk(memberId);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    // Soft delete by updating status
    await member.update({ 
      status: 'inactive',
      deletedAt: new Date()
    });

    res.json({
      success: true,
      message: 'Member deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting member:', error);
    res.status(500).json({ error: 'Failed to delete member' });
  }
});

// Export members to CSV
router.get('/export/csv', authenticateAdmin, async (req, res) => {
  try {
    const { status, type } = req.query;
    
    const whereClause = {};
    if (status && status !== 'all') whereClause.status = status;
    if (type && type !== 'all') whereClause.membershipType = type;

    const members = await User.findAll({
      where: whereClause,
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Payment,
          as: 'payments',
          attributes: ['amount', 'status', 'createdAt'],
          limit: 1,
          order: [['createdAt', 'DESC']]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    const csvData = members.map(member => ({
      'Membership Number': member.membershipNumber,
      'First Name': member.firstName,
      'Last Name': member.lastName,
      'Email': member.email,
      'Phone': member.phone,
      'Status': member.status,
      'Membership Type': member.membershipType,
      'Region': member.city,
      'Registration Date': member.createdAt,
      'Last Payment': member.payments?.[0]?.amount || 'N/A',
      'Payment Status': member.payments?.[0]?.status || 'N/A'
    }));

    const parser = new Parser();
    const csv = parser.parse(csvData);

    const filename = `members_export_${new Date().toISOString().split('T')[0]}.csv`;
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(csv);
  } catch (error) {
    console.error('Error exporting members:', error);
    res.status(500).json({ error: 'Failed to export members' });
  }
});

// Export members to PDF
router.get('/export/pdf', authenticateAdmin, async (req, res) => {
  try {
    const { status, type } = req.query;
    
    const whereClause = {};
    if (status && status !== 'all') whereClause.status = status;
    if (type && type !== 'all') whereClause.membershipType = type;

    const members = await User.findAll({
      where: whereClause,
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    });

    // For now, return JSON. In a real implementation, you'd use a PDF library
    // like puppeteer or jsPDF to generate the PDF
    res.json({
      success: true,
      message: 'PDF export functionality would be implemented here',
      memberCount: members.length,
      data: members
    });
  } catch (error) {
    console.error('Error exporting members to PDF:', error);
    res.status(500).json({ error: 'Failed to export members to PDF' });
  }
});

export default router; 