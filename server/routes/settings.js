import express from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import Settings from '../models/Settings.js';
import User from '../models/User.js';
import paystackService from '../services/paystackService.js';

const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Middleware to check admin role
const requireAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify admin access' });
  }
};

// Get all settings
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const settings = await Settings.findAll({
      order: [['category', 'ASC'], ['key', 'ASC']]
    });

    // Group settings by category
    const groupedSettings = settings.reduce((acc, setting) => {
      if (!acc[setting.category]) {
        acc[setting.category] = [];
      }
      acc[setting.category].push({
        id: setting.id,
        key: setting.key,
        value: setting.value,
        description: setting.description,
        isPublic: setting.isPublic
      });
      return acc;
    }, {});

    res.json({
      success: true,
      data: groupedSettings
    });

  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// Get settings by category
router.get('/category/:category', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { category } = req.params;
    const settings = await Settings.findAll({
      where: { category },
      order: [['key', 'ASC']]
    });

    res.json({
      success: true,
      data: settings
    });

  } catch (error) {
    console.error('Get settings by category error:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// Update settings
router.put('/update', [
  authenticateToken,
  requireAdmin,
  body('settings').isArray().withMessage('Settings must be an array'),
  body('settings.*.key').notEmpty().withMessage('Setting key is required'),
  body('settings.*.value').notEmpty().withMessage('Setting value is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { settings } = req.body;

    for (const setting of settings) {
      await Settings.upsert({
        key: setting.key,
        value: setting.value,
        category: setting.category || 'general',
        description: setting.description || '',
        isPublic: setting.isPublic || false
      });
    }

    res.json({
      success: true,
      message: 'Settings updated successfully'
    });

  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// Update Paystack settings specifically
router.put('/paystack', [
  authenticateToken,
  requireAdmin,
  body('secretKey').notEmpty().withMessage('Paystack secret key is required'),
  body('publicKey').notEmpty().withMessage('Paystack public key is required'),
  body('webhookSecret').optional(),
  body('testMode').isBoolean().withMessage('Test mode must be a boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { secretKey, publicKey, webhookSecret, testMode } = req.body;

    // Update Paystack settings
    const paystackSettings = {
      secretKey,
      publicKey,
      webhookSecret: webhookSecret || '',
      testMode: testMode || false
    };

    const result = await paystackService.updatePaymentSettings(paystackSettings);

    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    res.json({
      success: true,
      message: 'Paystack settings updated successfully'
    });

  } catch (error) {
    console.error('Update Paystack settings error:', error);
    res.status(500).json({ error: 'Failed to update Paystack settings' });
  }
});

// Get Paystack settings
router.get('/paystack', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const settings = await paystackService.getPaymentSettings();

    res.json({
      success: true,
      data: settings
    });

  } catch (error) {
    console.error('Get Paystack settings error:', error);
    res.status(500).json({ error: 'Failed to fetch Paystack settings' });
  }
});

// Test Paystack connection
router.post('/paystack/test', authenticateToken, requireAdmin, async (req, res) => {
  try {
    // Test the Paystack connection by making a simple API call
    const testResult = await paystackService.verifyPayment('test-reference');

    if (testResult.success) {
      res.json({
        success: true,
        message: 'Paystack connection successful'
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'Paystack connection failed',
        details: testResult.error
      });
    }

  } catch (error) {
    console.error('Test Paystack connection error:', error);
    res.status(500).json({ error: 'Failed to test Paystack connection' });
  }
});

// Update general settings
router.put('/general', [
  authenticateToken,
  requireAdmin,
  body('organizationName').notEmpty().withMessage('Organization name is required'),
  body('website').optional().isURL().withMessage('Website must be a valid URL'),
  body('contactEmail').optional().isEmail().withMessage('Contact email must be valid'),
  body('address').optional(),
  body('phone').optional()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { organizationName, website, contactEmail, address, phone } = req.body;

    const generalSettings = [
      { key: 'organizationName', value: organizationName, category: 'general' },
      { key: 'website', value: website || '', category: 'general' },
      { key: 'contactEmail', value: contactEmail || '', category: 'general' },
      { key: 'address', value: address || '', category: 'general' },
      { key: 'phone', value: phone || '', category: 'general' }
    ];

    for (const setting of generalSettings) {
      await Settings.upsert({
        key: setting.key,
        value: setting.value,
        category: setting.category,
        description: `General ${setting.key} setting`
      });
    }

    res.json({
      success: true,
      message: 'General settings updated successfully'
    });

  } catch (error) {
    console.error('Update general settings error:', error);
    res.status(500).json({ error: 'Failed to update general settings' });
  }
});

// Update payment settings
router.put('/payment', [
  authenticateToken,
  requireAdmin,
  body('currency').isIn(['GHS', 'USD', 'EUR']).withMessage('Invalid currency'),
  body('membershipFee').isFloat({ min: 0 }).withMessage('Membership fee must be positive'),
  body('latePaymentFee').isFloat({ min: 0 }).withMessage('Late payment fee must be positive'),
  body('autoReminders').isBoolean().withMessage('Auto reminders must be boolean'),
  body('reminderDays').isInt({ min: 1, max: 30 }).withMessage('Reminder days must be between 1 and 30')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { currency, membershipFee, latePaymentFee, autoReminders, reminderDays } = req.body;

    const paymentSettings = [
      { key: 'currency', value: currency, category: 'payment' },
      { key: 'membershipFee', value: membershipFee.toString(), category: 'payment' },
      { key: 'latePaymentFee', value: latePaymentFee.toString(), category: 'payment' },
      { key: 'autoReminders', value: autoReminders.toString(), category: 'payment' },
      { key: 'reminderDays', value: reminderDays.toString(), category: 'payment' }
    ];

    for (const setting of paymentSettings) {
      await Settings.upsert({
        key: setting.key,
        value: setting.value,
        category: setting.category,
        description: `Payment ${setting.key} setting`
      });
    }

    res.json({
      success: true,
      message: 'Payment settings updated successfully'
    });

  } catch (error) {
    console.error('Update payment settings error:', error);
    res.status(500).json({ error: 'Failed to update payment settings' });
  }
});

// Get public settings (no authentication required)
router.get('/public', async (req, res) => {
  try {
    const settings = await Settings.findAll({
      where: { isPublic: true },
      order: [['category', 'ASC'], ['key', 'ASC']]
    });

    const publicSettings = {};
    settings.forEach(setting => {
      publicSettings[setting.key] = setting.value;
    });

    res.json({
      success: true,
      data: publicSettings
    });

  } catch (error) {
    console.error('Get public settings error:', error);
    res.status(500).json({ error: 'Failed to fetch public settings' });
  }
});

export default router; 