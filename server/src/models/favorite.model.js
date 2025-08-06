export default (sequelize, DataTypes) => sequelize.define('Favorite', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  wordId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}, {
  timestamps: false,
  tableName: 'Favorite'
});
