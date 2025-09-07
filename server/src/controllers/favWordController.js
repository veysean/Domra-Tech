import db from '../models/index.js';

const { User, WordTranslation } = db;


/**
 * @swagger
 * /favorites:
 *   post:
 *     summary: Add a word to the user's favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - wordId
 *             properties:
 *               wordId:
 *                 type: integer
 *                 example: 42
 *     responses:
 *       201:
 *         description: Favorite created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                 wordId:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Bad request or duplicate favorite
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: This word is already in your favorites.
 *       500:
 *         description: Internal server error
 */

const createFavorite = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { wordId } = req.body;

    if (!wordId) {
      return res.status(400).json({ error: 'wordId is required.' });
    }

    const favorite = await db.Favorite.create({ userId, wordId });
    res.status(201).json(favorite);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'This word is already in your favorites.' });
    }
    console.error('Error creating favorite:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};


/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Retrieve all favorite words for the authenticated user, including their translations
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of favorite words with translations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   EnglishWord:
 *                     type: string
 *                     example: "hello"
 *                   FrenchWord:
 *                     type: string
 *                     example: "bonjour"
 *                   KhmerWord:
 *                     type: string
 *                     example: "សួស្តី"
 *                   definition:
 *                     type: string
 *                     example: "A greeting or expression of goodwill"
 *                   example:
 *                     type: string
 *                     example: "She said hello to everyone."
 *                   reference:
 *                     type: string
 *                     example: "Oxford Dictionary"
 *       401:
 *         description: Unauthorized - Authentication required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

const getAllFavorites = async (req, res) => {
  try {
    const userId = req.user.userId;

    const userWithFavorites = await User.findByPk(userId, {
      include: [{
        model: WordTranslation,
        as: 'WordTranslations', 
        attributes: [
          'wordId',
          'EnglishWord',
          'FrenchWord',
          'KhmerWord',
          'definition',
          'example',
          'reference'
        ]
      }]
    });

    if (!userWithFavorites) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(userWithFavorites.WordTranslations);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


/**
 * @swagger
 * /favorites/{wordId}:
 *   delete:
 *     summary: Delete a favorite word for the authenticated user
 *     tags: [Favorites]
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
 *         description: word is removed from favorite
 *       404:
 *         description: Favorite not found
 */
const deleteFavorite = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { wordId } = req.params;
    const deleted = await db.Favorite.destroy({ where: { userId, wordId } });
    if (!deleted) return res.status(404).json({ error: 'Favorite not found' });
    res.json({ message: 'word is removed from favorite' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createFavorite,
  getAllFavorites,
  deleteFavorite
};
