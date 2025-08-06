export default (sequelize, DataTypes) => sequelize.define('Category', {
  categoryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  categoryName: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'Category'
});
