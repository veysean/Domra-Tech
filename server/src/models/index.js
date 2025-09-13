import { Sequelize } from "sequelize";
import dbConfig from "../config/db.config.js";
import categoryModel from "./category.model.js";
import correctionRequestModel from "./correctionRequest.model.js";
import favoriteModel from "./favorite.model.js";
import feedbackModel from "./feedback.model.js";
import userModel from "./user.model.js";
import wordCategoryModel from "./wordCategory.model.js";
import wordRequestModel from "./wordRequest.model.js";
import wordTranslationModel from "./wordTranslation.model.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    logging: process.env.NODE_ENV === 'development' ? console.log : false 
});

const db = {
    Sequelize,
    sequelize,
    Category: categoryModel(sequelize, Sequelize),
    CorrectionRequest: correctionRequestModel(sequelize, Sequelize),
    Favorite: favoriteModel(sequelize, Sequelize),
    Feedback: feedbackModel(sequelize, Sequelize),
    User: userModel(sequelize, Sequelize),
    WordCategory: wordCategoryModel(sequelize, Sequelize),
    WordRequest: wordRequestModel(sequelize, Sequelize),
    WordTranslation: wordTranslationModel(sequelize, Sequelize)
};

// Define associations

// User - CorrectionRequest
db.User.hasMany(db.CorrectionRequest, { foreignKey: 'userId' });
db.CorrectionRequest.belongsTo(db.User, { foreignKey: 'userId' });

// WordTranslation - CorrectionRequest
db.WordTranslation.hasMany(db.CorrectionRequest, { foreignKey: 'wordId' });
db.CorrectionRequest.belongsTo(db.WordTranslation, { foreignKey: 'wordId' });

// WordTranslation - Category (Many to Many)
db.WordTranslation.belongsToMany(db.Category, {
  through: db.WordCategory,
  foreignKey: 'wordId',
  otherKey: 'categoryId'
});
db.Category.belongsToMany(db.WordTranslation, {
  through: db.WordCategory,
  foreignKey: 'categoryId',
  otherKey: 'wordId'
});

// User - WordRequest
db.User.hasMany(db.WordRequest, { foreignKey: 'userId' });
db.WordRequest.belongsTo(db.User, { foreignKey: 'userId' });

// User - WordTranslation (Favorites)
db.User.belongsToMany(db.WordTranslation, {
  through: db.Favorite,
  foreignKey: 'userId',
});
db.WordTranslation.belongsToMany(db.User, {
  through: db.Favorite,
  foreignKey: 'wordId',
});

// Feedback
db.User.hasMany(db.Feedback, { foreignKey: 'userId' });
db.Feedback.belongsTo(db.User, { foreignKey: 'userId' });

db.WordTranslation.hasMany(db.Feedback, { foreignKey: 'wordId' });
db.Feedback.belongsTo(db.WordTranslation, { foreignKey: 'wordId' });

export default db;
