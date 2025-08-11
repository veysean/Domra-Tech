export default (sequelize, DataTypes) => sequelize.define('Feedback', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  wordId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  message: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'Feedback'
});
