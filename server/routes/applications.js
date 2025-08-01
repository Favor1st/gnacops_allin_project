import express from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { Application } from '../models/Application.js';
import { User } from '../models/User.js';
import { sequelize } from '../database/config.js';
import { Parser } from 'json2csv';
import nodemailer from 'nodemailer';

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

// Get all applications with pagination and filters
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    const status = req.query.status || 'all';
    const type = req.query.type || 'all';

    const whereClause = {};
    
    if (status !== 'all') {
      whereClause.status = status;
    }

    if (type !== 'all') {
      whereClause.type = type;
    }

    const { count, rows: applications } = await Application.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'applicant',
          attributes: ['firstName', 'lastName', 'email', 'phone']
        },
        {
          model: User,
          as: 'reviewer',
          attributes: ['firstName', 'lastName']
        }
      ],
      order: [['submittedAt', 'DESC']],
      limit,
      offset
    });

    // Filter by search term if provided
    let filteredApplications = applications;
    if (search) {
      filteredApplications = applications.filter(app => 
        app.applicant.firstName.toLowerCase().includes(search.toLowerCase()) ||
        app.applicant.lastName.toLowerCase().includes(search.toLowerCase()) ||
        app.applicant.email.toLowerCase().includes(search.toLowerCase()) ||
        app.applicationNumber.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.json({
      applications: filteredApplications,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Get application details
router.get('/:id', authenticateAdmin, async (req, res) => {
  try {
    const applicationId = req.params.id;
    
    const application = await Application.findByPk(applicationId, {
      include: [
        {
          model: User,
          as: 'applicant',
          attributes: { exclude: ['password'] }
        },
        {
          model: User,
          as: 'reviewer',
          attributes: ['firstName', 'lastName', 'email']
        }
      ]
    });

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    console.error('Error fetching application details:', error);
    res.status(500).json({ error: 'Failed to fetch application details' });
  }
});

// Start review process
router.put('/:id/start-review', authenticateAdmin, [
  body('reviewNotes').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const applicationId = req.params.id;
    const { reviewNotes } = req.body;

    const application = await Application.findByPk(applicationId, {
      include: [
        {
          model: User,
          as: 'applicant',
          attributes: ['firstName', 'lastName', 'email']
        }
      ]
    });

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    if (application.status !== 'pending') {
      return res.status(400).json({ error: 'Application is not in pending status' });
    }

    await application.update({
      status: 'under_review',
      reviewedBy: req.user.id,
      reviewedAt: new Date(),
      reviewNotes: reviewNotes || null
    });

    // Send email notification to applicant
    try {
      await sendApplicationStatusEmail(application.applicant.email, {
        name: `${application.applicant.firstName} ${application.applicant.lastName}`,
        applicationNumber: application.applicationNumber,
        status: 'under_review',
        message: 'Your application is now under review.'
      });
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
    }

    res.json({
      success: true,
      message: 'Application review started successfully',
      application: {
        id: application.id,
        applicationNumber: application.applicationNumber,
        status: application.status,
        reviewedAt: application.reviewedAt
      }
    });
  } catch (error) {
    console.error('Error starting application review:', error);
    res.status(500).json({ error: 'Failed to start application review' });
  }
});

// Approve application
router.put('/:id/approve', authenticateAdmin, [
  body('reviewNotes').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const applicationId = req.params.id;
    const { reviewNotes } = req.body;

    const application = await Application.findByPk(applicationId, {
      include: [
        {
          model: User,
          as: 'applicant',
          attributes: ['firstName', 'lastName', 'email']
        }
      ]
    });

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    if (application.status === 'approved') {
      return res.status(400).json({ error: 'Application is already approved' });
    }

    await application.update({
      status: 'approved',
      reviewedBy: req.user.id,
      reviewedAt: new Date(),
      reviewNotes: reviewNotes || application.reviewNotes
    });

    // Update user status to active
    await application.applicant.update({ status: 'active' });

    // Send approval email
    try {
      await sendApplicationStatusEmail(application.applicant.email, {
        name: `${application.applicant.firstName} ${application.applicant.lastName}`,
        applicationNumber: application.applicationNumber,
        status: 'approved',
        message: 'Congratulations! Your application has been approved.'
      });
    } catch (emailError) {
      console.error('Failed to send approval email:', emailError);
    }

    res.json({
      success: true,
      message: 'Application approved successfully',
      application: {
        id: application.id,
        applicationNumber: application.applicationNumber,
        status: application.status,
        reviewedAt: application.reviewedAt
      }
    });
  } catch (error) {
    console.error('Error approving application:', error);
    res.status(500).json({ error: 'Failed to approve application' });
  }
});

// Reject application
router.put('/:id/reject', authenticateAdmin, [
  body('reviewNotes').notEmpty().withMessage('Review notes are required for rejection')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const applicationId = req.params.id;
    const { reviewNotes } = req.body;

    const application = await Application.findByPk(applicationId, {
      include: [
        {
          model: User,
          as: 'applicant',
          attributes: ['firstName', 'lastName', 'email']
        }
      ]
    });

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    if (application.status === 'rejected') {
      return res.status(400).json({ error: 'Application is already rejected' });
    }

    await application.update({
      status: 'rejected',
      reviewedBy: req.user.id,
      reviewedAt: new Date(),
      reviewNotes: reviewNotes
    });

    // Send rejection email
    try {
      await sendApplicationStatusEmail(application.applicant.email, {
        name: `${application.applicant.firstName} ${application.applicant.lastName}`,
        applicationNumber: application.applicationNumber,
        status: 'rejected',
        message: 'Your application has been rejected. Please review the feedback and reapply if needed.',
        notes: reviewNotes
      });
    } catch (emailError) {
      console.error('Failed to send rejection email:', emailError);
    }

    res.json({
      success: true,
      message: 'Application rejected successfully',
      application: {
        id: application.id,
        applicationNumber: application.applicationNumber,
        status: application.status,
        reviewedAt: application.reviewedAt
      }
    });
  } catch (error) {
    console.error('Error rejecting application:', error);
    res.status(500).json({ error: 'Failed to reject application' });
  }
});

// Contact applicant
router.post('/:id/contact', authenticateAdmin, [
  body('subject').notEmpty().withMessage('Subject is required'),
  body('message').notEmpty().withMessage('Message is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const applicationId = req.params.id;
    const { subject, message } = req.body;

    const application = await Application.findByPk(applicationId, {
      include: [
        {
          model: User,
          as: 'applicant',
          attributes: ['firstName', 'lastName', 'email']
        }
      ]
    });

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Send email to applicant
    try {
      await sendContactEmail(application.applicant.email, {
        name: `${application.applicant.firstName} ${application.applicant.lastName}`,
        applicationNumber: application.applicationNumber,
        subject,
        message,
        adminName: `${req.user.firstName} ${req.user.lastName}`
      });
    } catch (emailError) {
      console.error('Failed to send contact email:', emailError);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    res.json({
      success: true,
      message: 'Contact email sent successfully'
    });
  } catch (error) {
    console.error('Error sending contact email:', error);
    res.status(500).json({ error: 'Failed to send contact email' });
  }
});

// Export applications to CSV
router.get('/export/csv', authenticateAdmin, async (req, res) => {
  try {
    const { status, type } = req.query;
    
    const whereClause = {};
    if (status && status !== 'all') whereClause.status = status;
    if (type && type !== 'all') whereClause.type = type;

    const applications = await Application.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'applicant',
          attributes: ['firstName', 'lastName', 'email']
        },
        {
          model: User,
          as: 'reviewer',
          attributes: ['firstName', 'lastName']
        }
      ],
      order: [['submittedAt', 'DESC']]
    });

    const csvData = applications.map(app => ({
      'Application Number': app.applicationNumber,
      'Applicant Name': `${app.applicant.firstName} ${app.applicant.lastName}`,
      'Email': app.applicant.email,
      'Type': app.type,
      'Status': app.status,
      'Region': app.region,
      'Submitted': app.submittedAt,
      'Reviewed By': app.reviewer ? `${app.reviewer.firstName} ${app.reviewer.lastName}` : 'N/A',
      'Reviewed At': app.reviewedAt || 'N/A',
      'Documents Submitted': app.documentsSubmitted,
      'Documents Required': app.documentsRequired
    }));

    const parser = new Parser();
    const csv = parser.parse(csvData);

    const filename = `applications_export_${new Date().toISOString().split('T')[0]}.csv`;
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(csv);
  } catch (error) {
    console.error('Error exporting applications:', error);
    res.status(500).json({ error: 'Failed to export applications' });
  }
});

// Helper function to send application status emails
async function sendApplicationStatusEmail(to, data) {
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const emailContent = `
    Dear ${data.name},

    Your application (${data.applicationNumber}) status has been updated to: ${data.status.toUpperCase()}

    ${data.message}

    ${data.notes ? `Review Notes: ${data.notes}` : ''}

    Best regards,
    GNACOPS Team
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: to,
    subject: `Application ${data.applicationNumber} - ${data.status.toUpperCase()}`,
    text: emailContent
  });
}

// Helper function to send contact emails
async function sendContactEmail(to, data) {
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const emailContent = `
    Dear ${data.name},

    You have received a message regarding your application (${data.applicationNumber}):

    Subject: ${data.subject}
    
    Message:
    ${data.message}

    Best regards,
    ${data.adminName}
    GNACOPS Team
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: to,
    subject: `Application ${data.applicationNumber} - ${data.subject}`,
    text: emailContent
  });
}

export default router; 