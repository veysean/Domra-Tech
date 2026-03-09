export default (sequelize, DataTypes) => sequelize.define('Payment', {
  paymentId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'The user who made the payment'
  },
  externalTransactionId: {
    type: DataTypes.STRING(255),
    allowNull: true,
    unique: true,
    comment: 'The transaction ID returned by Bakong'
  },
  md5Hash: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Security hash for Bakong verification'
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  currency: {
    type: DataTypes.ENUM('USD', 'KHR'),
    defaultValue: 'USD',
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'success', 'failed'),
    defaultValue: 'pending',
    allowNull: false
  },
  qrString: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'The KHQR string generated for Flutter to display'
  }
}, {
  tableName: 'Payment',
  timestamps: true // This adds createdAt and updatedAt automatically
});