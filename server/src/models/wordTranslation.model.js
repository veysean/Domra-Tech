export default (sequelize, DataTypes) => sequelize.define('WordTranslation', {
  wordId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  EnglishWord: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  KhmerWord: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  definition: {
    type: DataTypes.TEXT
  },
  EnglishEx: {
    type: DataTypes.TEXT
  },
  KhmerEx: {
    type: DataTypes.TEXT
  },
  reference: {
    type: DataTypes.TEXT
  },
  image: {
    type: DataTypes.STRING(255)
  }
}, {
  timestamps: false,
  tableName: 'WordTranslation'
});
