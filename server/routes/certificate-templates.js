import express from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { CertificateTemplate } from '../models/CertificateTemplate.js';
import { User } from '../models/User.js';
import { Certificate } from '../models/Certificate.js';
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

// Get all certificate templates
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    const status = req.query.status || 'all';

    const whereClause = {};
    
    if (search) {
      whereClause[sequelize.Op.or] = [
        { name: { [sequelize.Op.like]: `%${search}%` } },
        { description: { [sequelize.Op.like]: `%${search}%` } }
      ];
    }

    if (status !== 'all') {
      whereClause.status = status;
    }

    const { count, rows: templates } = await CertificateTemplate.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['firstName', 'lastName', 'email']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });

    res.json({
      templates,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Error fetching certificate templates:', error);
    res.status(500).json({ error: 'Failed to fetch certificate templates' });
  }
});

// Get certificate template details
router.get('/:id', authenticateAdmin, async (req, res) => {
  try {
    const templateId = req.params.id;
    
    const template = await CertificateTemplate.findByPk(templateId, {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['firstName', 'lastName', 'email']
        }
      ]
    });

    if (!template) {
      return res.status(404).json({ error: 'Certificate template not found' });
    }

    res.json(template);
  } catch (error) {
    console.error('Error fetching certificate template details:', error);
    res.status(500).json({ error: 'Failed to fetch certificate template details' });
  }
});

// Create new certificate template
router.post('/', authenticateAdmin, [
  body('name').notEmpty().withMessage('Template name is required'),
  body('description').optional(),
  body('templateHtml').notEmpty().withMessage('Template HTML is required'),
  body('settings').optional().isObject(),
  body('components').optional().isArray(),
  body('variables').optional().isArray()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, templateHtml, settings, components, variables } = req.body;

    const template = await CertificateTemplate.create({
      name,
      description,
      templateHtml,
      settings: settings || {},
      components: components || [],
      variables: variables || [],
      createdBy: req.user.id,
      status: 'draft'
    });

    const createdTemplate = await CertificateTemplate.findByPk(template.id, {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['firstName', 'lastName', 'email']
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Certificate template created successfully',
      template: createdTemplate
    });
  } catch (error) {
    console.error('Error creating certificate template:', error);
    res.status(500).json({ error: 'Failed to create certificate template' });
  }
});

// Update certificate template
router.put('/:id', authenticateAdmin, [
  body('name').optional().notEmpty().withMessage('Template name cannot be empty'),
  body('description').optional(),
  body('templateHtml').optional().notEmpty().withMessage('Template HTML cannot be empty'),
  body('settings').optional().isObject(),
  body('components').optional().isArray(),
  body('variables').optional().isArray(),
  body('status').optional().isIn(['draft', 'active', 'archived']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const templateId = req.params.id;
    const updateData = req.body;

    const template = await CertificateTemplate.findByPk(templateId);
    if (!template) {
      return res.status(404).json({ error: 'Certificate template not found' });
    }

    await template.update(updateData);

    const updatedTemplate = await CertificateTemplate.findByPk(templateId, {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['firstName', 'lastName', 'email']
        }
      ]
    });

    res.json({
      success: true,
      message: 'Certificate template updated successfully',
      template: updatedTemplate
    });
  } catch (error) {
    console.error('Error updating certificate template:', error);
    res.status(500).json({ error: 'Failed to update certificate template' });
  }
});

// Delete certificate template
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const templateId = req.params.id;

    const template = await CertificateTemplate.findByPk(templateId);
    if (!template) {
      return res.status(404).json({ error: 'Certificate template not found' });
    }

    // Check if template is being used by any certificates
    const certificatesUsingTemplate = await Certificate.count({
      where: { templateId: templateId }
    });

    if (certificatesUsingTemplate > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete template. It is being used by existing certificates.' 
      });
    }

    await template.destroy();

    res.json({
      success: true,
      message: 'Certificate template deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting certificate template:', error);
    res.status(500).json({ error: 'Failed to delete certificate template' });
  }
});

// Preview certificate template with sample data
router.post('/:id/preview', authenticateAdmin, [
  body('sampleData').isObject().withMessage('Sample data is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const templateId = req.params.id;
    const { sampleData } = req.body;

    const template = await CertificateTemplate.findByPk(templateId);
    if (!template) {
      return res.status(404).json({ error: 'Certificate template not found' });
    }

    // Replace variables in template HTML with sample data
    let previewHtml = template.templateHtml;
    
    // Replace handlebars-style variables
    Object.keys(sampleData).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      previewHtml = previewHtml.replace(regex, sampleData[key]);
    });

    res.json({
      success: true,
      previewHtml,
      template: {
        id: template.id,
        name: template.name,
        settings: template.settings
      }
    });
  } catch (error) {
    console.error('Error generating template preview:', error);
    res.status(500).json({ error: 'Failed to generate template preview' });
  }
});

// Generate certificate from template
router.post('/:id/generate', authenticateAdmin, [
  body('userId').isUUID().withMessage('Valid user ID is required'),
  body('certificateData').isObject().withMessage('Certificate data is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const templateId = req.params.id;
    const { userId, certificateData } = req.body;

    const template = await CertificateTemplate.findByPk(templateId);
    if (!template) {
      return res.status(404).json({ error: 'Certificate template not found' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate certificate HTML from template
    let certificateHtml = template.templateHtml;
    
    // Replace variables with actual data
    Object.keys(certificateData).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      certificateHtml = certificateHtml.replace(regex, certificateData[key]);
    });

    // Create certificate record
    const certificate = await Certificate.create({
      userId,
      issuedBy: req.user.id,
      title: certificateData.title || 'Certificate',
      description: certificateData.description || '',
      type: certificateData.type || 'membership',
      templateId: template.id,
      templateData: certificateData,
      status: 'active'
    });

    res.json({
      success: true,
      message: 'Certificate generated successfully',
      certificate: {
        id: certificate.id,
        certificateNumber: certificate.certificateNumber,
        html: certificateHtml
      }
    });
  } catch (error) {
    console.error('Error generating certificate:', error);
    res.status(500).json({ error: 'Failed to generate certificate' });
  }
});

// Set template as default
router.put('/:id/set-default', authenticateAdmin, async (req, res) => {
  try {
    const templateId = req.params.id;

    const template = await CertificateTemplate.findByPk(templateId);
    if (!template) {
      return res.status(404).json({ error: 'Certificate template not found' });
    }

    // Remove default from all other templates
    await CertificateTemplate.update(
      { isDefault: false },
      { where: { isDefault: true } }
    );

    // Set this template as default
    await template.update({ isDefault: true });

    res.json({
      success: true,
      message: 'Template set as default successfully'
    });
  } catch (error) {
    console.error('Error setting template as default:', error);
    res.status(500).json({ error: 'Failed to set template as default' });
  }
});

// Duplicate template
router.post('/:id/duplicate', authenticateAdmin, async (req, res) => {
  try {
    const templateId = req.params.id;

    const originalTemplate = await CertificateTemplate.findByPk(templateId);
    if (!originalTemplate) {
      return res.status(404).json({ error: 'Certificate template not found' });
    }

    const duplicatedTemplate = await CertificateTemplate.create({
      name: `${originalTemplate.name} (Copy)`,
      description: originalTemplate.description,
      templateHtml: originalTemplate.templateHtml,
      settings: originalTemplate.settings,
      components: originalTemplate.components,
      variables: originalTemplate.variables,
      createdBy: req.user.id,
      status: 'draft',
      isDefault: false
    });

    const newTemplate = await CertificateTemplate.findByPk(duplicatedTemplate.id, {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['firstName', 'lastName', 'email']
        }
      ]
    });

    res.json({
      success: true,
      message: 'Template duplicated successfully',
      template: newTemplate
    });
  } catch (error) {
    console.error('Error duplicating template:', error);
    res.status(500).json({ error: 'Failed to duplicate template' });
  }
});

// Export templates to CSV
router.get('/export/csv', authenticateAdmin, async (req, res) => {
  try {
    const { status } = req.query;
    
    const whereClause = {};
    if (status && status !== 'all') whereClause.status = status;

    const templates = await CertificateTemplate.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['firstName', 'lastName', 'email']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    const csvData = templates.map(template => ({
      'Template ID': template.id,
      'Name': template.name,
      'Description': template.description,
      'Status': template.status,
      'Created By': `${template.creator.firstName} ${template.creator.lastName}`,
      'Created At': template.createdAt,
      'Updated At': template.updatedAt,
      'Is Default': template.isDefault ? 'Yes' : 'No',
      'Version': template.version,
      'Components Count': template.components?.length || 0,
      'Variables Count': template.variables?.length || 0
    }));

    const parser = new Parser();
    const csv = parser.parse(csvData);

    const filename = `certificate_templates_export_${new Date().toISOString().split('T')[0]}.csv`;
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(csv);
  } catch (error) {
    console.error('Error exporting certificate templates:', error);
    res.status(500).json({ error: 'Failed to export certificate templates' });
  }
});

export default router; 