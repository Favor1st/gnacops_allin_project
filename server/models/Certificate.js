import { DataTypes } from 'sequelize';
import { sequelize } from '../database/config.js';
import { User } from './User.js';

const Certificate = sequelize.define('Certificate', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  certificateNumber: {
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
  issuedBy: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  type: {
    type: DataTypes.ENUM('membership', 'achievement', 'completion', 'recognition', 'custom'),
    defaultValue: 'membership'
  },
  status: {
    type: DataTypes.ENUM('active', 'revoked', 'expired'),
    defaultValue: 'active'
  },
  issuedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  revokedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  revokedBy: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  revocationReason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  templateId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  templateData: {
    type: DataTypes.JSON,
    allowNull: true
  },
  qrCode: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pdfPath: {
    type: DataTypes.STRING,
    allowNull: true
  },
  emailSent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  emailSentAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  program: {
    type: DataTypes.STRING,
    allowNull: true
  },
  achievement: {
    type: DataTypes.STRING,
    allowNull: true
  },
  grade: {
    type: DataTypes.STRING,
    allowNull: true
  },
  hours: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  signature: {
    type: DataTypes.STRING,
    allowNull: true
  },
  signatureName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  signatureTitle: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
  hooks: {
    beforeCreate: (certificate) => {
      if (!certificate.certificateNumber) {
        const year = new Date().getFullYear();
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        certificate.certificateNumber = `CERT-${year}-${random}`;
      }
    }
  }
});

// Associations
Certificate.belongsTo(User, { as: 'recipient', foreignKey: 'userId' });
Certificate.belongsTo(User, { as: 'issuer', foreignKey: 'issuedBy' });
Certificate.belongsTo(User, { as: 'revoker', foreignKey: 'revokedBy' });

export { Certificate }; 