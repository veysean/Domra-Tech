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
  correctFrenchWord: {
    type: DataTypes.STRING(255)
  },
  correctKhmerWord: {
    type: DataTypes.STRING(255)
  },
  reference: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'denied', 'deleted')
  }
}, {
  tableName: 'CorrectionRequest'
});
