import express from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import paystackService from '../services/paystackService.js';
import Payment from '../models/Payment.js';
import User from '../models/User.js';

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

// Initialize payment
router.post('/initialize', [
  authenticateToken,
  body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
  body('paymentType').isIn(['membership_fee', 'late_fee', 'certificate_fee', 'other']).withMessage('Invalid payment type'),
  body('description').notEmpty().withMessage('Description is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, paymentType, description } = req.body;
    const userId = req.user.id;

    // Get user details
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate unique reference
    const reference = `PAY-${Date.now()}-${uuidv4().substring(0, 8)}`;

    // Create payment record
    const payment = await Payment.create({
      userId,
      paystackReference: reference,
      amount,
      description,
      paymentType,
      status: 'pending'
    });

    // Initialize payment with Paystack
    const callbackUrl = `${process.env.FRONTEND_URL}/payment/callback`;
    const paystackResponse = await paystackService.initializePayment({
      email: user.email,
      amount,
      reference,
      callbackUrl,
      userId,
      paymentType,
      description
    });

    if (!paystackResponse.success) {
      await payment.update({ status: 'failed', failureReason: paystackResponse.error });
      return res.status(400).json({ error: paystackResponse.error });
    }

    res.json({
      success: true,
      data: {
        authorizationUrl: paystackResponse.data.authorization_url,
        reference,
        paymentId: payment.id
      },
      message: 'Payment initialized successfully'
    });

  } catch (error) {
    console.error('Payment initialization error:', error);
    res.status(500).json({ error: 'Failed to initialize payment' });
  }
});

// Verify payment
router.get('/verify/:reference', async (req, res) => {
  try {
    const { reference } = req.params;

    // Verify payment with Paystack
    const verificationResult = await paystackService.verifyPayment(reference);

    if (!verificationResult.success) {
      return res.status(400).json({ error: verificationResult.error });
    }

    // Update payment record
    const payment = await Payment.findOne({ where: { paystackReference: reference } });
    if (payment) {
      await payment.update({
        status: verificationResult.data.status === 'success' ? 'successful' : 'failed',
        paystackTransactionId: verificationResult.data.transactionId,
        paidAt: verificationResult.data.paidAt,
        gatewayResponse: verificationResult.data
      });
    }

    res.json({
      success: true,
      data: verificationResult.data,
      message: 'Payment verified successfully'
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
});

// Get user payments
router.get('/user', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const payments = await Payment.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: payments
    });

  } catch (error) {
    console.error('Get user payments error:', error);
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});

// Get payment by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const payment = await Payment.findOne({
      where: { id, userId },
      include: [{ model: User, as: 'user', attributes: ['firstName', 'lastName', 'email'] }]
    });

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json({
      success: true,
      data: payment
    });

  } catch (error) {
    console.error('Get payment error:', error);
    res.status(500).json({ error: 'Failed to fetch payment' });
  }
});

// Paystack webhook
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const signature = req.headers['x-paystack-signature'];
    
    if (!signature) {
      return res.status(400).json({ error: 'Missing signature' });
    }

    // Verify webhook signature
    const isValid = paystackService.verifyWebhookSignature(req.body, signature);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    // Parse the webhook payload
    const event = JSON.parse(req.body);

    // Process the webhook
    const result = await paystackService.processWebhook(event);

    if (result.success) {
      res.json({ status: 'success' });
    } else {
      console.error('Webhook processing failed:', result.error);
      res.status(400).json({ error: result.error });
    }

  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Get payment statistics (admin only)
router.get('/stats/admin', authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    const user = await User.findByPk(req.user.id);
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const totalPayments = await Payment.count();
    const successfulPayments = await Payment.count({ where: { status: 'successful' } });
    const pendingPayments = await Payment.count({ where: { status: 'pending' } });
    const failedPayments = await Payment.count({ where: { status: 'failed' } });

    const totalAmount = await Payment.sum('amount', { where: { status: 'successful' } });

    res.json({
      success: true,
      data: {
        totalPayments,
        successfulPayments,
        pendingPayments,
        failedPayments,
        totalAmount: totalAmount || 0
      }
    });

  } catch (error) {
    console.error('Get payment stats error:', error);
    res.status(500).json({ error: 'Failed to fetch payment statistics' });
  }
});

export default router; 