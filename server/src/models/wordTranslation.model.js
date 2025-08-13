export default (sequelize, DataTypes) => sequelize.define('WordTranslation', {
  wordId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  EnglishWord: {
    type: DataTypes.STRING(255),
  },
  FrenchWord: {
    type: DataTypes.STRING(255),
  },
  KhmerWord: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  normalizedWord: {
    type: DataTypes.STRING(255),
  },
  definition: {
    type: DataTypes.TEXT
  },
  example: {
    type: DataTypes.TEXT
  },
  reference: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'WordTranslation'
});
