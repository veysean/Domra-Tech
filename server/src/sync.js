import db from './models/index.js';

const syncDatabase = async () => {
  try {
    // Correct: Access the sequelize instance via the db object
    await db.sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Correct: Access the sync method on the sequelize instance
    await db.sequelize.sync({ alter: true });
    console.log('Database models synchronized.');

    process.exit(0);
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
    process.exit(1);
  }
};

syncDatabase();