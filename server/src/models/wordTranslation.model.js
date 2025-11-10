import { khnormal } from 'khmer-normalizer';

export default (sequelize, DataTypes) => {
  const WordTranslation = sequelize.define('WordTranslation', {
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
    imageURL: {
      type: DataTypes.STRING(255),
    },
    reference: {
      type: DataTypes.TEXT
    },
    referenceText: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'WordTranslation',
    hooks: {
      beforeCreate: (record) => {
        if (record.KhmerWord) {
          record.normalizedWord = khnormal(record.KhmerWord);
        }
      },
      beforeUpdate: (record) => {
        if (record.KhmerWord) {
          record.normalizedWord = khnormal(record.KhmerWord);
        }
      }
    }
  });

  return WordTranslation;
};