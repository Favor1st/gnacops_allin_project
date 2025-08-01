import express from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { Certificate } from '../models/Certificate.js';
import { User } from '../models/User.js';
import { Parser } from 'json2csv';
import nodemailer from 'nodemailer';
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

// Get all certificates with pagination and filters
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
        { title: { [sequelize.Op.like]: `%${search}%` } },
        { certificateNumber: { [sequelize.Op.like]: `%${search}%` } }
      ];
    }

    if (status !== 'all') {
      whereClause.status = status;
    }

    if (type !== 'all') {
      whereClause.type = type;
    }

    const { count, rows: certificates } = await Certificate.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'recipient',
          attributes: ['firstName', 'lastName', 'email']
        },
        {
          model: User,
          as: 'issuer',
          attributes: ['firstName', 'lastName']
        }
      ],
      order: [['issuedAt', 'DESC']],
      limit,
      offset
    });

    res.json({
      certificates,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({ error: 'Failed to fetch certificates' });
  }
});

// Get certificate details
router.get('/:id', authenticateAdmin, async (req, res) => {
  try {
    const certificateId = req.params.id;
    
    const certificate = await Certificate.findByPk(certificateId, {
      include: [
        {
          model: User,
          as: 'recipient',
          attributes: { exclude: ['password'] }
        },
        {
          model: User,
          as: 'issuer',
          attributes: ['firstName', 'lastName', 'email']
        },
        {
          model: User,
          as: 'revoker',
          attributes: ['firstName', 'lastName']
        }
      ]
    });

    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    res.json(certificate);
  } catch (error) {
    console.error('Error fetching certificate details:', error);
    res.status(500).json({ error: 'Failed to fetch certificate details' });
  }
});

// Create new certificate
router.post('/', authenticateAdmin, [
  body('userId').isUUID().withMessage('Valid user ID is required'),
  body('title').notEmpty().withMessage('Title is required'),
  body('description').optional(),
  body('type').isIn(['membership', 'achievement', 'completion', 'recognition', 'custom']).withMessage('Invalid certificate type'),
  body('program').optional(),
  body('achievement').optional(),
  body('grade').optional(),
  body('hours').optional().isInt({ min: 0 }),
  body('expiresAt').optional().isISO8601().withMessage('Invalid expiry date'),
  body('signatureName').optional(),
  body('signatureTitle').optional()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      userId,
      title,
      description,
      type,
      program,
      achievement,
      grade,
      hours,
      expiresAt,
      signatureName,
      signatureTitle
    } = req.body;

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const certificate = await Certificate.create({
      userId,
      issuedBy: req.user.id,
      title,
      description,
      type,
      program,
      achievement,
      grade,
      hours,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      signatureName: signatureName || `${req.user.firstName} ${req.user.lastName}`,
      signatureTitle: signatureTitle || 'Administrator'
    });

    const createdCertificate = await Certificate.findByPk(certificate.id, {
      include: [
        {
          model: User,
          as: 'recipient',
          attributes: ['firstName', 'lastName', 'email']
        },
        {
          model: User,
          as: 'issuer',
          attributes: ['firstName', 'lastName']
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Certificate created successfully',
      certificate: createdCertificate
    });
  } catch (error) {
    console.error('Error creating certificate:', error);
    res.status(500).json({ error: 'Failed to create certificate' });
  }
});

// Update certificate
router.put('/:id', authenticateAdmin, [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional(),
  body('type').optional().isIn(['membership', 'achievement', 'completion', 'recognition', 'custom']).withMessage('Invalid certificate type'),
  body('program').optional(),
  body('achievement').optional(),
  body('grade').optional(),
  body('hours').optional().isInt({ min: 0 }),
  body('expiresAt').optional().isISO8601().withMessage('Invalid expiry date'),
  body('signatureName').optional(),
  body('signatureTitle').optional()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const certificateId = req.params.id;
    const updateData = req.body;

    const certificate = await Certificate.findByPk(certificateId);
    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    await certificate.update(updateData);

    const updatedCertificate = await Certificate.findByPk(certificateId, {
      include: [
        {
          model: User,
          as: 'recipient',
          attributes: ['firstName', 'lastName', 'email']
        },
        {
          model: User,
          as: 'issuer',
          attributes: ['firstName', 'lastName']
        }
      ]
    });

    res.json({
      success: true,
      message: 'Certificate updated successfully',
      certificate: updatedCertificate
    });
  } catch (error) {
    console.error('Error updating certificate:', error);
    res.status(500).json({ error: 'Failed to update certificate' });
  }
});

// Revoke certificate
router.put('/:id/revoke', authenticateAdmin, [
  body('revocationReason').notEmpty().withMessage('Revocation reason is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const certificateId = req.params.id;
    const { revocationReason } = req.body;

    const certificate = await Certificate.findByPk(certificateId, {
      include: [
        {
          model: User,
          as: 'recipient',
          attributes: ['firstName', 'lastName', 'email']
        }
      ]
    });

    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    if (certificate.status === 'revoked') {
      return res.status(400).json({ error: 'Certificate is already revoked' });
    }

    await certificate.update({
      status: 'revoked',
      revokedAt: new Date(),
      revokedBy: req.user.id,
      revocationReason
    });

    // Send email notification to recipient
    try {
      await sendCertificateRevocationEmail(certificate.recipient.email, {
        name: `${certificate.recipient.firstName} ${certificate.recipient.lastName}`,
        certificateNumber: certificate.certificateNumber,
        title: certificate.title,
        reason: revocationReason
      });
    } catch (emailError) {
      console.error('Failed to send revocation email:', emailError);
    }

    res.json({
      success: true,
      message: 'Certificate revoked successfully',
      certificate: {
        id: certificate.id,
        certificateNumber: certificate.certificateNumber,
        status: certificate.status,
        revokedAt: certificate.revokedAt
      }
    });
  } catch (error) {
    console.error('Error revoking certificate:', error);
    res.status(500).json({ error: 'Failed to revoke certificate' });
  }
});

// Download certificate as PDF
router.get('/:id/download', authenticateAdmin, async (req, res) => {
  try {
    const certificateId = req.params.id;

    const certificate = await Certificate.findByPk(certificateId, {
      include: [
        {
          model: User,
          as: 'recipient',
          attributes: ['firstName', 'lastName', 'email']
        },
        {
          model: User,
          as: 'issuer',
          attributes: ['firstName', 'lastName']
        }
      ]
    });

    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    // For now, return JSON. In a real implementation, you'd generate PDF
    const pdfData = {
      certificateNumber: certificate.certificateNumber,
      title: certificate.title,
      recipientName: `${certificate.recipient.firstName} ${certificate.recipient.lastName}`,
      issuerName: `${certificate.issuer.firstName} ${certificate.issuer.lastName}`,
      issuedAt: certificate.issuedAt,
      expiresAt: certificate.expiresAt,
      program: certificate.program,
      achievement: certificate.achievement,
      grade: certificate.grade,
      hours: certificate.hours
    };

    const filename = `${certificate.certificateNumber}_${new Date().toISOString().split('T')[0]}.json`;
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.json(pdfData);
  } catch (error) {
    console.error('Error downloading certificate:', error);
    res.status(500).json({ error: 'Failed to download certificate' });
  }
});

// Send certificate via email
router.post('/:id/email', authenticateAdmin, async (req, res) => {
  try {
    const certificateId = req.params.id;

    const certificate = await Certificate.findByPk(certificateId, {
      include: [
        {
          model: User,
          as: 'recipient',
          attributes: ['firstName', 'lastName', 'email']
        },
        {
          model: User,
          as: 'issuer',
          attributes: ['firstName', 'lastName']
        }
      ]
    });

    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    if (certificate.status !== 'active') {
      return res.status(400).json({ error: 'Cannot send inactive certificate' });
    }

    // Send email
    try {
      await sendCertificateEmail(certificate.recipient.email, {
        name: `${certificate.recipient.firstName} ${certificate.recipient.lastName}`,
        certificateNumber: certificate.certificateNumber,
        title: certificate.title,
        issuerName: `${certificate.issuer.firstName} ${certificate.issuer.lastName}`,
        issuedAt: certificate.issuedAt,
        expiresAt: certificate.expiresAt
      });

      // Update certificate email status
      await certificate.update({
        emailSent: true,
        emailSentAt: new Date()
      });

      res.json({
        success: true,
        message: 'Certificate sent via email successfully'
      });
    } catch (emailError) {
      console.error('Failed to send certificate email:', emailError);
      res.status(500).json({ error: 'Failed to send certificate email' });
    }
  } catch (error) {
    console.error('Error sending certificate email:', error);
    res.status(500).json({ error: 'Failed to send certificate email' });
  }
});

// Bulk email certificates
router.post('/bulk-email', authenticateAdmin, [
  body('certificateIds').isArray().withMessage('Certificate IDs must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { certificateIds } = req.body;

    const certificates = await Certificate.findAll({
      where: {
        id: certificateIds,
        status: 'active'
      },
      include: [
        {
          model: User,
          as: 'recipient',
          attributes: ['firstName', 'lastName', 'email']
        },
        {
          model: User,
          as: 'issuer',
          attributes: ['firstName', 'lastName']
        }
      ]
    });

    let successCount = 0;
    let errorCount = 0;

    for (const certificate of certificates) {
      try {
        await sendCertificateEmail(certificate.recipient.email, {
          name: `${certificate.recipient.firstName} ${certificate.recipient.lastName}`,
          certificateNumber: certificate.certificateNumber,
          title: certificate.title,
          issuerName: `${certificate.issuer.firstName} ${certificate.issuer.lastName}`,
          issuedAt: certificate.issuedAt,
          expiresAt: certificate.expiresAt
        });

        await certificate.update({
          emailSent: true,
          emailSentAt: new Date()
        });

        successCount++;
      } catch (error) {
        console.error(`Failed to send certificate ${certificate.id}:`, error);
        errorCount++;
      }
    }

    res.json({
      success: true,
      message: `Bulk email completed. ${successCount} sent, ${errorCount} failed.`,
      results: {
        total: certificates.length,
        success: successCount,
        failed: errorCount
      }
    });
  } catch (error) {
    console.error('Error in bulk email:', error);
    res.status(500).json({ error: 'Failed to send bulk emails' });
  }
});

// Export certificates to CSV
router.get('/export/csv', authenticateAdmin, async (req, res) => {
  try {
    const { status, type } = req.query;
    
    const whereClause = {};
    if (status && status !== 'all') whereClause.status = status;
    if (type && type !== 'all') whereClause.type = type;

    const certificates = await Certificate.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'recipient',
          attributes: ['firstName', 'lastName', 'email']
        },
        {
          model: User,
          as: 'issuer',
          attributes: ['firstName', 'lastName']
        }
      ],
      order: [['issuedAt', 'DESC']]
    });

    const csvData = certificates.map(cert => ({
      'Certificate Number': cert.certificateNumber,
      'Title': cert.title,
      'Type': cert.type,
      'Status': cert.status,
      'Recipient': `${cert.recipient.firstName} ${cert.recipient.lastName}`,
      'Recipient Email': cert.recipient.email,
      'Issuer': `${cert.issuer.firstName} ${cert.issuer.lastName}`,
      'Issued At': cert.issuedAt,
      'Expires At': cert.expiresAt || 'N/A',
      'Program': cert.program || 'N/A',
      'Achievement': cert.achievement || 'N/A',
      'Grade': cert.grade || 'N/A',
      'Hours': cert.hours || 'N/A',
      'Email Sent': cert.emailSent ? 'Yes' : 'No',
      'Email Sent At': cert.emailSentAt || 'N/A'
    }));

    const parser = new Parser();
    const csv = parser.parse(csvData);

    const filename = `certificates_export_${new Date().toISOString().split('T')[0]}.csv`;
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(csv);
  } catch (error) {
    console.error('Error exporting certificates:', error);
    res.status(500).json({ error: 'Failed to export certificates' });
  }
});

// Helper function to send certificate email
async function sendCertificateEmail(to, data) {
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

    Your certificate has been issued successfully!

    Certificate Details:
    - Certificate Number: ${data.certificateNumber}
    - Title: ${data.title}
    - Issued By: ${data.issuerName}
    - Issue Date: ${new Date(data.issuedAt).toLocaleDateString()}
    ${data.expiresAt ? `- Valid Until: ${new Date(data.expiresAt).toLocaleDateString()}` : ''}

    You can download your certificate from your account dashboard.

    Best regards,
    GNACOPS Team
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: to,
    subject: `Certificate Issued - ${data.certificateNumber}`,
    text: emailContent
  });
}

// Helper function to send certificate revocation email
async function sendCertificateRevocationEmail(to, data) {
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

    Your certificate has been revoked.

    Certificate Details:
    - Certificate Number: ${data.certificateNumber}
    - Title: ${data.title}
    - Revocation Reason: ${data.reason}

    If you have any questions about this revocation, please contact our support team.

    Best regards,
    GNACOPS Team
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: to,
    subject: `Certificate Revoked - ${data.certificateNumber}`,
    text: emailContent
  });
}

export default router; 