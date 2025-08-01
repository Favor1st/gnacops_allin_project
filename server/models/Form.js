import { DataTypes } from 'sequelize';
import { sequelize } from '../database/config.js';
import { User } from './User.js';

const Form = sequelize.define('Form', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('draft', 'published', 'archived', 'deleted'),
    defaultValue: 'draft'
  },
  type: {
    type: DataTypes.ENUM('membership', 'application', 'survey', 'feedback', 'custom'),
    defaultValue: 'custom'
  },
  fields: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: []
  },
  settings: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {}
  },
  shareToken: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  allowMultipleSubmissions: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  submissionLimit: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  version: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  templateId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Forms',
      key: 'id'
    }
  }
}, {
  timestamps: true,
  paranoid: true, // This enables soft deletes
  hooks: {
    beforeCreate: (form) => {
      if (!form.shareToken) {
        form.shareToken = Math.random().toString(36).substring(2, 15) + 
                         Math.random().toString(36).substring(2, 15);
      }
    }
  }
});

// Associations
Form.belongsTo(User, { as: 'creator', foreignKey: 'createdBy' });
Form.belongsTo(Form, { as: 'template', foreignKey: 'templateId' });

export { Form }; 