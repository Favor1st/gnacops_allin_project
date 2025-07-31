import { DataTypes } from 'sequelize';
import { sequelize } from '../database/config.js';
import User from './User.js';

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  paystackReference: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  paystackTransactionId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'GHS'
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  paymentType: {
    type: DataTypes.ENUM('membership_fee', 'late_fee', 'certificate_fee', 'other'),
    defaultValue: 'membership_fee'
  },
  status: {
    type: DataTypes.ENUM('pending', 'successful', 'failed', 'abandoned'),
    defaultValue: 'pending'
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gatewayResponse: {
    type: DataTypes.JSON,
    allowNull: true
  },
  metadata: {
    type: DataTypes.JSON,
    defaultValue: {}
  },
  paidAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  failureReason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  refunded: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  refundAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  refundedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  receiptUrl: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

// Define association
Payment.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Payment, { foreignKey: 'userId', as: 'payments' });

export default Payment; 