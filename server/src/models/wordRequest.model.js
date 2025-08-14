export default (sequelize, DataTypes) => sequelize.define('WordRequest', {
  wordRequestId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  newEnglishWord: {
    type: DataTypes.STRING(255)
  },
  newFrenchWord: {
    type: DataTypes.STRING(255)
  },
  newKhmerWord: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  newDefinition: {
    type: DataTypes.TEXT
  },
  newExample: {
    type: DataTypes.TEXT
  },
  reference: {
    type: DataTypes.TEXT
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'denied', 'deleted')
  }
}, {
  tableName: 'WordRequest'
});
