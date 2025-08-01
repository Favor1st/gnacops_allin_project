import { DataTypes } from 'sequelize';
import { sequelize } from '../database/config.js';
import { User } from './User.js';

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  applicationNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  type: {
    type: DataTypes.ENUM('Teacher Council', 'Parent Council', 'Institutional', 'Proprietor'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'under_review', 'approved', 'rejected'),
    defaultValue: 'pending'
  },
  priority: {
    type: DataTypes.ENUM('low', 'normal', 'high'),
    defaultValue: 'normal'
  },
  region: {
    type: DataTypes.STRING,
    allowNull: false
  },
  submittedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  reviewedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  reviewedBy: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  reviewNotes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  documentsSubmitted: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  documentsRequired: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  formData: {
    type: DataTypes.JSON,
    allowNull: true
  },
  contactEmail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contactPhone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  organizationName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  position: {
    type: DataTypes.STRING,
    allowNull: true
  },
  experience: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  education: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  references: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  additionalNotes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true,
  hooks: {
    beforeCreate: (application) => {
      if (!application.applicationNumber) {
        const year = new Date().getFullYear();
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        application.applicationNumber = `REG-${year}-${random}`;
      }
    }
  }
});

// Associations
Application.belongsTo(User, { as: 'applicant', foreignKey: 'userId' });
Application.belongsTo(User, { as: 'reviewer', foreignKey: 'reviewedBy' });

export { Application }; 