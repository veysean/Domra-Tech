export default (sequelize, DataTypes) => sequelize.define('WordCategory', {
  wordId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}, {
  tableName: 'WordCategory'
});
