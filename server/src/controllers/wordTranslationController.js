// server/controllers/wordController.js
/**
 * @swagger
 * tags:
 *   name: WordTranslations
 *   description: API for managing word translations
 */
import db from '../models/index.js';
import { Op } from 'sequelize';

const { WordTranslation } = db;

// Function to search for words (case-insensitive)
/**
 * @swagger
 * /words/search:
 *   get:
 *     summary: Search for words
 *     tags: [WordTranslations]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of matching words
 */

const searchWords = async (req, res) => {
  try {
    const searchTerm = req.query.q;

    if (!searchTerm) {
      return res.status(400).json({ error: 'Search term is required' });
    }
    
    const words = await WordTranslation.findAll({
      where: {
        [Op.or]: [
          db.sequelize.where(
            db.sequelize.fn('lower', db.sequelize.col('EnglishWord')), 
            { [Op.like]: `%${searchTerm.toLowerCase()}%` }
          ),
          db.sequelize.where(
            db.sequelize.fn('lower', db.sequelize.col('KhmerWord')), 
            { [Op.like]: `%${searchTerm.toLowerCase()}%` }
          )
        ]
      }
    });

    return res.status(200).json(words);

  } catch (error) {
    console.error('Search query failed:', error);
    return res.status(500).json({ error: 'Failed to search for words' });
  }
};

// Function to find all word translations
/**
 * @swagger
 * /words:
 *   get:
 *     summary: Get all word translations
 *     tags: [WordTranslations]
 *     responses:
 *       200:
 *         description: List of all words
 */

const findAll = async (req, res) => {
  try {
    const words = await WordTranslation.findAll();
    return res.status(200).json(words);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to retrieve words' });
  }
};

// Function to find a single word translation by ID
/**
 * @swagger
 * /words/{wordId}:
 *   get:
 *     summary: Get a word by ID
 *     tags: [WordTranslations]
 *     parameters:
 *       - in: path
 *         name: wordId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Word ID
 *     responses:
 *       200:
 *         description: Word details
 */

const findById = async (req, res) => {
  try {
    const word = await WordTranslation.findByPk(req.params.wordId);
    if (!word) {
      return res.status(404).json({ error: 'Word not found' });
    }
    return res.status(200).json(word);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to retrieve word' });
  }
  
};

// Function to create a new word translation
/**
 * @swagger
 * /words:
 *   post:
 *     summary: Create a new word translation
 *     tags: [WordTranslations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WordTranslation'
 *     responses:
 *       201:
 *         description: Word created
 */

const create = async (req, res) => {
  try {
    const newWord = await WordTranslation.create(req.body);
    return res.status(201).json(newWord);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create word' });
  }
};

// Function to update a word translation
/**
 * @swagger
 * /words/{wordId}:
 *   put:
 *     summary: Update a word translation
 *     tags: [WordTranslations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: wordId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WordTranslation'
 *     responses:
 *       200:
 *         description: Word updated
 */

const update = async (req, res) => {
  try {
    const [updated] = await WordTranslation.update(req.body, {
      where: { wordId: req.params.wordId },
    });
    if (updated) {
      const updatedWord = await WordTranslation.findByPk(req.params.wordId);
      return res.status(200).json(updatedWord);
    }
    return res.status(404).json({ error: 'Word not found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update word' });
  }
};

// Function to perform a hard delete
/**
 * @swagger
 * /words/{wordId}:
 *   delete:
 *     summary: Delete a word translation
 *     tags: [WordTranslations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: wordId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Word deleted
 */

const remove = async (req, res) => {
  try {
    const deleted = await WordTranslation.destroy({
      where: { wordId: req.params.wordId },
    });
    if (deleted) {
      return res.status(204).send();
    }
    return res.status(404).json({ error: 'Word not found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete word' });
  }
};

export default {
  findAll,
  findById,
  create,
  update,
  remove,
  searchWords,
};