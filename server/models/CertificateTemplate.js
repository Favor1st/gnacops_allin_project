import { DataTypes } from 'sequelize';
import { sequelize } from '../database/config.js';
import { User } from './User.js';

const CertificateTemplate = sequelize.define('CertificateTemplate', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
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
    type: DataTypes.ENUM('draft', 'active', 'archived'),
    defaultValue: 'draft'
  },
  templateHtml: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  templateData: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {}
  },
  settings: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {
      width: 1000,
      height: 700,
      backgroundColor: '#ffffff',
      borderColor: '#000000',
      borderWidth: 10,
      fontFamily: 'Georgia, serif',
      primaryColor: '#000000',
      secondaryColor: '#666666'
    }
  },
  components: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  variables: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  isDefault: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  version: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true
});

// Associations
CertificateTemplate.belongsTo(User, { as: 'creator', foreignKey: 'createdBy' });

export { CertificateTemplate }; 