/**
 * @swagger
 * tags:
 *   name: WordTranslations
 *   description: API for managing word translations
 */

import express from 'express';
import wordTranslationController from '../controllers/wordTranslationController.js';
import { verifyAuth, checkAdminRole } from '../middleware/authMiddleware.js';

const router = express.Router();

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
router.get('/words/search', wordTranslationController.searchWords);

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
router.get('/words', wordTranslationController.findAll);

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
router.get('/words/:wordId', wordTranslationController.findById);

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
router.post('/words', verifyAuth, checkAdminRole, wordTranslationController.create);

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
router.put('/words/:wordId', verifyAuth, checkAdminRole, wordTranslationController.update);

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
router.delete('/words/:wordId', verifyAuth, checkAdminRole, wordTranslationController.remove);

export default router;
