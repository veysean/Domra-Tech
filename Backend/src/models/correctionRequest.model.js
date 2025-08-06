export default (sequelize, DataTypes) => sequelize.define('CorrectionRequest', {
  correctionId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  wordId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  correctEnglishWord: {
    type: DataTypes.STRING(255)
  },
  correctKhmerWord: {
    type: DataTypes.STRING(255)
  },
  reference: {
    type: DataTypes.TEXT
  },
  image: {
    type: DataTypes.STRING(255)
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'denied')
  }
}, {
  timestamps: false,
  tableName: 'CorrectionRequest'
});
