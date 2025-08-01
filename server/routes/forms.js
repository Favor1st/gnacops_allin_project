import express from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { Form } from '../models/Form.js';
import { User } from '../models/User.js';
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

// Get all forms with pagination and filters
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
        { description: { [sequelize.Op.like]: `%${search}%` } }
      ];
    }

    if (status !== 'all') {
      whereClause.status = status;
    }

    if (type !== 'all') {
      whereClause.type = type;
    }

    const { count, rows: forms } = await Form.findAndCountAll({
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
      forms,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({ error: 'Failed to fetch forms' });
  }
});

// Get form details
router.get('/:id', authenticateAdmin, async (req, res) => {
  try {
    const formId = req.params.id;
    
    const form = await Form.findByPk(formId, {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['firstName', 'lastName', 'email']
        }
      ]
    });

    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }

    res.json(form);
  } catch (error) {
    console.error('Error fetching form details:', error);
    res.status(500).json({ error: 'Failed to fetch form details' });
  }
});

// Create new form
router.post('/', authenticateAdmin, [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').optional(),
  body('type').isIn(['membership', 'application', 'survey', 'feedback', 'custom']).withMessage('Invalid form type'),
  body('fields').isArray().withMessage('Fields must be an array'),
  body('settings').optional().isObject()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, type, fields, settings } = req.body;

    const form = await Form.create({
      title,
      description,
      type,
      fields,
      settings: settings || {},
      createdBy: req.user.id,
      status: 'draft'
    });

    res.status(201).json({
      success: true,
      message: 'Form created successfully',
      form
    });
  } catch (error) {
    console.error('Error creating form:', error);
    res.status(500).json({ error: 'Failed to create form' });
  }
});

// Update form
router.put('/:id', authenticateAdmin, [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional(),
  body('type').optional().isIn(['membership', 'application', 'survey', 'feedback', 'custom']).withMessage('Invalid form type'),
  body('fields').optional().isArray().withMessage('Fields must be an array'),
  body('settings').optional().isObject(),
  body('status').optional().isIn(['draft', 'published', 'archived']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const formId = req.params.id;
    const updateData = req.body;

    const form = await Form.findByPk(formId);
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }

    await form.update(updateData);

    const updatedForm = await Form.findByPk(formId, {
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
      message: 'Form updated successfully',
      form: updatedForm
    });
  } catch (error) {
    console.error('Error updating form:', error);
    res.status(500).json({ error: 'Failed to update form' });
  }
});

// Delete form (soft delete)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const formId = req.params.id;

    const form = await Form.findByPk(formId);
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }

    // Soft delete
    await form.destroy();

    res.json({
      success: true,
      message: 'Form deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting form:', error);
    res.status(500).json({ error: 'Failed to delete form' });
  }
});

// Restore form from trash
router.put('/:id/restore', authenticateAdmin, async (req, res) => {
  try {
    const formId = req.params.id;

    const form = await Form.findByPk(formId, { paranoid: false });
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }

    if (!form.deletedAt) {
      return res.status(400).json({ error: 'Form is not deleted' });
    }

    await form.restore();

    res.json({
      success: true,
      message: 'Form restored successfully'
    });
  } catch (error) {
    console.error('Error restoring form:', error);
    res.status(500).json({ error: 'Failed to restore form' });
  }
});

// Get forms in trash
router.get('/trash/list', authenticateAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows: forms } = await Form.findAndCountAll({
      where: {
        deletedAt: { [sequelize.Op.ne]: null }
      },
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['firstName', 'lastName', 'email']
        }
      ],
      order: [['deletedAt', 'DESC']],
      limit,
      offset,
      paranoid: false
    });

    res.json({
      forms,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Error fetching trash forms:', error);
    res.status(500).json({ error: 'Failed to fetch trash forms' });
  }
});

// Share form (generate shareable link)
router.post('/:id/share', authenticateAdmin, async (req, res) => {
  try {
    const formId = req.params.id;
    const { isPublic } = req.body;

    const form = await Form.findByPk(formId);
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }

    // Generate new share token if not exists
    if (!form.shareToken) {
      form.shareToken = Math.random().toString(36).substring(2, 15) + 
                       Math.random().toString(36).substring(2, 15);
    }

    await form.update({ isPublic: isPublic || false });

    const shareUrl = `${process.env.FRONTEND_URL}/forms/${form.shareToken}`;

    res.json({
      success: true,
      message: 'Form shared successfully',
      shareUrl,
      shareToken: form.shareToken
    });
  } catch (error) {
    console.error('Error sharing form:', error);
    res.status(500).json({ error: 'Failed to share form' });
  }
});

// Export form as JSON
router.get('/:id/export/json', authenticateAdmin, async (req, res) => {
  try {
    const formId = req.params.id;

    const form = await Form.findByPk(formId);
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }

    const exportData = {
      title: form.title,
      description: form.description,
      type: form.type,
      fields: form.fields,
      settings: form.settings,
      createdAt: form.createdAt,
      updatedAt: form.updatedAt
    };

    const filename = `${form.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${new Date().toISOString().split('T')[0]}.json`;
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.json(exportData);
  } catch (error) {
    console.error('Error exporting form:', error);
    res.status(500).json({ error: 'Failed to export form' });
  }
});

// Export forms to CSV
router.get('/export/csv', authenticateAdmin, async (req, res) => {
  try {
    const { status, type } = req.query;
    
    const whereClause = {};
    if (status && status !== 'all') whereClause.status = status;
    if (type && type !== 'all') whereClause.type = type;

    const forms = await Form.findAll({
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

    const csvData = forms.map(form => ({
      'Form ID': form.id,
      'Title': form.title,
      'Description': form.description,
      'Type': form.type,
      'Status': form.status,
      'Created By': `${form.creator.firstName} ${form.creator.lastName}`,
      'Created At': form.createdAt,
      'Updated At': form.updatedAt,
      'Fields Count': form.fields?.length || 0,
      'Share Token': form.shareToken || 'N/A',
      'Is Public': form.isPublic ? 'Yes' : 'No'
    }));

    const parser = new Parser();
    const csv = parser.parse(csvData);

    const filename = `forms_export_${new Date().toISOString().split('T')[0]}.csv`;
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(csv);
  } catch (error) {
    console.error('Error exporting forms:', error);
    res.status(500).json({ error: 'Failed to export forms' });
  }
});

export default router; 