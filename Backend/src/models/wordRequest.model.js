export default (sequelize, DataTypes) => sequelize.define('WordRequest', {
  wordRequestId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  newEnglishWord: {
    type: DataTypes.STRING(255)
  },
  newKhmerWord: {
    type: DataTypes.STRING(255)
  },
  newmeaning: {
    type: DataTypes.TEXT
  },
  newEnglishEx: {
    type: DataTypes.TEXT
  },
  newKhmerEx: {
    type: DataTypes.TEXT
  },
  reference: {
    type: DataTypes.TEXT
  },
  image: {
    type: DataTypes.STRING(255)
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'denied')
  }
}, {
  timestamps: false,
  tableName: 'WordRequest'
});
