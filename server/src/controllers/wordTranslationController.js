// server/controllers/wordController.js
/**
 * @swagger
 * tags:
 *   name: WordTranslations
 *   description: API for managing word translations
 */
import db from '../models/index.js';
import { Op } from 'sequelize';
import { khnormal } from 'khmer-normalizer';

const { WordTranslation } = db;

// Function to search for words (case-insensitive)
/**
 * @swagger
 * /words/search:
 *   get:
 *     summary: Search for words in English, French, or Khmer (case-insensitive)
 *     description: Returns a list of word translations that match the search query. The search is case-insensitive and supports normalized Khmer input.
 *     tags: [WordTranslations]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: The search term to look for in EnglishWord, FrenchWord, or normalized Khmer word.
 *     responses:
 *       200:
 *         description: List of matching word translations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   EnglishWord:
 *                     type: string
 *                   FrenchWord:
 *                     type: string
 *                   KhmerWord:
 *                     type: string
 *                   normalizedWord:
 *                     type: string
 *       400:
 *         description: Missing search term
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Search term is required
 *       500:
 *         description: Server error while searching for words
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to search for words
 */


const searchWords = async (req, res) => {
  try {
    const searchTerm = req.query.q;

    if (!searchTerm) {
      return res.status(400).json({ error: 'Search term is required' });
    }

    const normalizedSearchTerm = khnormal(searchTerm.toLowerCase());

    const words = await WordTranslation.findAll({
      where: {
        [Op.or]: [
          // Search EnglishWord (case-insensitive)
          db.sequelize.where(
            db.sequelize.fn('lower', db.sequelize.col('EnglishWord')),
            { [Op.like]: `%${searchTerm.toLowerCase()}%` }
          ),
          // Search FrenchWord (case-insensitive)
          db.sequelize.where(
            db.sequelize.fn('lower', db.sequelize.col('FrenchWord')),
            { [Op.like]: `%${searchTerm.toLowerCase()}%` }
          ),
          // Search normalizedWord for Khmer (normalized and case-insensitive)
          db.sequelize.where(
            db.sequelize.fn('lower', db.sequelize.col('normalizedWord')),
            { [Op.like]: `%${normalizedSearchTerm}%` }
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

// Function to find all word translations with pagination

/**
 * @swagger
 * /words:
 *   get:
 *     summary: Get all word translations
 *     tags: [WordTranslations]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of items per page
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paginated list of word translations
 *       500:
 *         description: Failed to retrieve words
 */

const findAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const categoryId = req.query.categoryId;

    let where = {};
    let include = [];
    if (categoryId) {
      include.push({
        model: db.Category,
        where: { categoryId: Number(categoryId) },
        through: { attributes: [] },
        attributes: [],
        required: true, // Ensures INNER JOIN for filtering
      });
    }

    // Debug logging
    console.log('findAll called with categoryId:', categoryId);
    console.log('Sequelize include:', JSON.stringify(include, null, 2));

    const words = await WordTranslation.findAndCountAll({
      where,
      include,
      limit: limit,
      offset: offset,
    });

    // Print the number of words returned for debugging
    console.log('Words returned:', words.rows.length, 'of', words.count);

    return res.status(200).json({
      totalItems: words.count,
      totalPages: Math.ceil(words.count / limit),
      currentPage: page,
      words: words.rows,
    });
    return res.status(200).json({
      totalItems: words.count,
      totalPages: Math.ceil(words.count / limit),
      currentPage: page,
      words: words.rows,
    });
  } catch (error) {
    console.error('findAll error:', error);
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
    const word = await WordTranslation.findByPk(req.params.wordId, {
      include: [{ model: db.Category }],
    });
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
 * /admin/words:
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
 *             type: object
 *             required:
 *               - KhmerWord
 *             properties:
 *               EnglishWord:
 *                 type: string
 *               FrenchWord:
 *                 type: string
 *               KhmerWord:
 *                 type: string
 *               definition:
 *                 type: string
 *               example:
 *                 type: string
 *               reference:
 *                 type: string
 *     responses:
 *       201:
 *         description: Word created successfully
 *       500:
 *         description: Server error while creating word
 */

const create = async (req, res) => {
  try {
    const { categories, ...wordData } = req.body;
    // Create the word
    const newWord = await WordTranslation.create(wordData);
    // Assign categories if provided
    if (categories && Array.isArray(categories) && categories.length > 0) {
      if (typeof newWord.setCategories === 'function') {
        await newWord.setCategories(categories);
        console.log('Assigned categories to new word', newWord.wordId, categories);
      } else {
        console.error('No setCategories method found on newWord instance');
      }
    }
    // Return the new word with categories
    const wordWithCategories = await WordTranslation.findByPk(newWord.wordId, {
      include: [{ model: db.Category }],
    });
    return res.status(201).json(wordWithCategories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create word' });
  }
};

// Function to update a word translation
/**
 * @swagger
 * /admin/words/{wordId}:
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
 *         description: ID of the word to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               EnglishWord:
 *                 type: string
 *               FrenchWord:
 *                 type: string
 *               KhmerWord:
 *                 type: string
 *               definition:
 *                 type: string
 *               example:
 *                 type: string
 *               reference:
 *                 type: string
 *     responses:
 *       200:
 *         description: Word updated successfully
 *       404:
 *         description: Word not found
 *       500:
 *         description: Server error while updating word
 */

const update = async (req, res) => {
  try {
    const { categories, ...wordData } = req.body;
    // Update word fields
    const [updated] = await WordTranslation.update(wordData, {
      where: { wordId: req.params.wordId },
    });
    if (!updated) {
      return res.status(404).json({ error: 'Word not found' });
    }
    // Update categories if provided
    if (categories && Array.isArray(categories)) {
      const word = await WordTranslation.findByPk(req.params.wordId);
      if (word) {
        if (typeof word.setCategories === 'function') {
          await word.setCategories(categories);
          console.log('Updated categories for word', req.params.wordId, 'to', categories);
        } else {
          // fallback: try setCategories from db.WordTranslation associations
          if (word.setCategory) {
            await word.setCategory(categories);
            console.log('Used setCategory fallback for word', req.params.wordId);
          } else {
            console.error('No setCategories or setCategory method found on word instance');
          }
        }
      }
    }
    // Return updated word with categories
    const updatedWord = await WordTranslation.findByPk(req.params.wordId, {
      include: [{ model: db.Category }],
    });
    return res.status(200).json(updatedWord);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update word' });
  }
};

// Function to perform a hard delete
/**
 * @swagger
 * /admin/words/{wordId}:
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
 *         description: Word deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Word deleted successfully
 */

const remove = async (req, res) => {
  try {
    const deleted = await WordTranslation.destroy({
      where: { wordId: req.params.wordId },
    });
    if (deleted) {
      return res.status(200).json({ message: 'Word deleted successfully' });
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