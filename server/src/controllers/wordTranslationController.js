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
import path from 'path';

const { WordTranslation, Category } = db;

// Function to search for words (case-insensitive)
/**
 * @swagger
 * /words/search:
 *    get:
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
 *       - in: query
 *         name: categoryId
 *         required: false
 *         description: Filter search results by category ID. Use "all" to search across all categories.
 *         schema:
 *           type: string
 *           example: "1"
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
// 

const searchWords = async (req, res) => {
  try {
    const { q, lang = "EnglishWord", categoryId } = req.query;

    if (!q) {
      return res.status(400).json({ error: "Search term is required" });
    }

    const raw = q.toLowerCase();
    const normalized = khnormal(q);

    const isKhmer = lang === "normalizedWord";

    // Category filter
    const include = [];
    if (categoryId && categoryId !== "all") {
      include.push({
        model: Category,
        as: "Categories",
        attributes: [],
        through: { attributes: [] },
        where: { categoryId },
      });
    }

    const where = isKhmer
      ? {
          normalizedWord: {
            [Op.like]: `${normalized}%`,
          },
        }
      : db.sequelize.where(
          db.sequelize.fn("LOWER", db.sequelize.col(lang)),
          {
            [Op.like]: `${raw}%`,
          }
        );

    const words = await WordTranslation.findAll({
      where,
      include,
      order: [[lang, "ASC"]],
    });

    return res.json(words);
  } catch (error) {
    console.error("SEARCH ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};



// const searchWords = async (req, res) => {
//   try {
//     const searchTerm = req.query.q;
//     const categoryId = req.query.categoryId;

//     if (!searchTerm) {
//       return res.status(400).json({ error: 'Search term is required' });
//     }

//     const rawSearchTerm = searchTerm.toLowerCase(); 
//     const normalizedSearchTerm = khnormal(searchTerm); 

//     let include = [];

//     if (categoryId && categoryId !== "all") {
//       include.push({
//         model: Category,
//         as: 'Categories',
//         attributes: [],
//         through: { attributes: [] },
//         where: { categoryId: categoryId }
//       });
//     }

//     const words = await WordTranslation.findAll({
//       where: {
//         [Op.or]: [
//           db.sequelize.where(
//             db.sequelize.fn('lower', db.sequelize.col('EnglishWord')),
//             { [Op.like]: `%${rawSearchTerm}%` }
//           ),
//           db.sequelize.where(
//             db.sequelize.fn('lower', db.sequelize.col('FrenchWord')),
//             { [Op.like]: `%${rawSearchTerm}%` }
//           ),
//           db.sequelize.where(
//             db.sequelize.col('normalizedWord'),
//             { [Op.like]: `%${normalizedSearchTerm}%` }
//           )
//         ]
//       },
//       include,
//       order: [
//         [db.sequelize.literal(`CASE 
//           WHEN lower("EnglishWord") = '${rawSearchTerm}' THEN 0
//           WHEN lower("FrenchWord") = '${rawSearchTerm}' THEN 1
//           WHEN "normalizedWord" = '${normalizedSearchTerm}' THEN 2
//           WHEN lower("EnglishWord") LIKE '${rawSearchTerm}%' THEN 3
//           WHEN lower("FrenchWord") LIKE '${rawSearchTerm}%' THEN 4
//           WHEN "normalizedWord" LIKE '${normalizedSearchTerm}%' THEN 5
//           ELSE 6 END`), 'ASC'],
//         [db.sequelize.fn('length', db.sequelize.col('EnglishWord')), 'ASC']
//       ]
//     });

//     return res.status(200).json(words);

//   } catch (error) {
//     console.error('Search query failed:', error);
//     return res.status(500).json({ error: 'Failed to search for words' });
//   }
// };




//wordcard for share feature 
/**
 * @swagger
 * /wordcards/{wordId}:
 *   get:
 *     summary: Retrieve public data for a word card
 *     description: Provides unauthenticated access to the basic word card data (English, Khmer, definition, etc.) for display on public share pages and within the React frontend's word-view route.
 *     tags:
 *       - WordTranslations
 *     parameters:
 *       - in: path
 *         name: wordId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the Word Translation card.
 *     responses:
 *       200:
 *         description: Public word card data successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 wordId:
 *                   type: integer
 *                   example: 123
 *                 EnglishWord:
 *                   type: string
 *                   example: "Hello"
 *                 FrenchWord:
 *                   type: string
 *                   example: "Bonjour"
 *                 KhmerWord:
 *                   type: string
 *                   example: "សួស្តី"
 *                 source:
 *                   type: string
 *                   example: >
 *                     Domra Lexicon: សួស្តី
 *                 definition:
 *                   type: string
 *                   example: >
 *                     Khmer: សួស្តី | Definition: Hello"
 *                 usageExample:
 *                   type: string
 *                   example: "We said 'Hello' to the tourists."
 *                 reference:
 *                   type: string
 *                   example: "General Cambodian Lexicon"
 *       404:
 *         description: Word card not found for the given ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Word not found"
 */

const getPublicWordCard = async (req, res) => {
    try {
        const word = await WordTranslation.findByPk(req.params.wordId, {
            // Include only necessary fields for public view
            attributes: ['wordId', 'EnglishWord', 'FrenchWord', 'KhmerWord', 'definition', 'example', 'reference'],
              include: [
                {
                  model: Category,
                  as: 'Categories',
                  attributes: ['categoryId', 'categoryName'],
                  through: { attributes: [] }, // hide join table
                },
              ],
        });

        if (!word) {
            return res.status(404).json({ error: 'Word not found' });
        }

        return res.status(200).json(word);
    } catch (error) {
        console.error('Error fetching public word card:', error);
        return res.status(500).json({ error: 'Failed to retrieve word data' });
    }
};

// pre written snippet, the sharable link (flyer)
/**
 * @swagger
 * /words/{wordId}/share:
 *   get:
 *     summary: Generate a shareable link and details for a word translation
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
 *         description: Shareable word details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   example: "https://frontend.example.com/word/123"
 *                 title:
 *                   type: string
 *                   example: >
 *                     Domra Lexicon: សួស្តី
 *                 text:
 *                   type: string
 *                   example: >
 *                     Khmer: សួស្តី | Definition: Hello
 *       404:
 *         description: Word not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Word not found"
 */


const findById = async (req, res) => {
    try {
        const word = await WordTranslation.findByPk(req.params.wordId, {
          attributes: ['wordId','EnglishWord','KhmerWord','FrenchWord','definition','example','reference'],
          include: [
            { model: Category, 
              as: 'Categories', 
              attributes: ['categoryId','categoryName'], 
              through: { attributes: [] } 
            }
          ]
        });
        if (!word) {
            return res.status(404).json({ error: 'Word not found' });
        }

        const LIVE_DOMAIN = process.env.FRONTEND_BASE_URL;
        const wordString = word.KhmerWord || word.EnglishWord || 'Word Card';
        const definitionSnippet = word.definition ? word.definition.substring(0, 100) + '...' : 'Check out this word card.';

        return res.status(200).json({
            url: `${LIVE_DOMAIN}/share/${word.wordId}`, 
            title: `${wordString} | Domra Lexicon`,
            text: `Khmer: ${word.KhmerWord || word.EnglishWord} - ${definitionSnippet}`
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to retrieve word' });
    }
};

// render share card page 
/**
 * @swagger
 * /share/{wordId}:
 *   get:
 *     summary: Renders the public HTML page for sharing a word card
 *     description: This route serves static HTML with dynamic Open Graph/Twitter meta tags for rich social media previews. It immediately redirects the user's browser to the React app.
 *     tags:
 *       - WordTranslations
 *     parameters:
 *       - in: path
 *         name: wordId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the word translation to share
 *     responses:
 *       200:
 *         description: HTML page containing dynamic word card meta tags and a redirect.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: |
 *                 <!DOCTYPE html>
 *                 <html>
 *                   <head>
 *                     <meta property="og:title" content="Word Name">
 *                     <meta property="og:description" content="Word card description">
 *                     <meta property="og:type" content="website">
 *                   </head>
 *                   <body>
 *                     <script>
 *                       window.location.href = "http://localhost:5173";
 *                     </script>
 *                   </body>
 *                 </html>
 *       404:
 *         description: Word not found
 */
const renderSharedCardPage = async (req, res) => {
    try {
        const word = await WordTranslation.findByPk(req.params.wordId);

        if (!word) {
            // Send a basic 404 HTML page
            res.setHeader('Content-Type', 'text/html');
            return res.status(404).send('<!DOCTYPE html><html><head><title>Not Found</title></head><body><h1>Word Card Not Found</h1></body></html>');
        }

        const LIVE_DOMAIN = process.env.FRONTEND_BASE_URL; 
        
        // --- Dynamic Meta Tag Preparation ---
        const wordString = word.KhmerWord || word.EnglishWord || 'Word Card';
        // Use a default description if none is available
        const definitionSnippet = word.definition ? word.definition.substring(0, 150) + '...' : 'Check out this word card from Domra Lexicon.';
        
        // Final public share URL (used by bots)
        const pageUrl = `${LIVE_DOMAIN}/share/${word.wordId}`; 
        // URL for the preview image
        const imageUrl = `${LIVE_DOMAIN}/Domra-logo.png`; 
        // The URL where the React app will handle the dynamic view
        const redirectUrl = `${LIVE_DOMAIN}/word-view/${word.wordId}`; 

        // 1. Build the Dynamic Meta Tags String
        const metaTags = `
            <meta property="og:title" content="${wordString} | Domra Lexicon">
            <meta property="og:description" content="${definitionSnippet}">
            <meta property="og:type" content="website">
            <meta property="og:url" content="${pageUrl}">
            <meta property="og:image" content="${imageUrl}">
            <meta property="og:site_name" content="Domra Lexicon">

            <meta name="twitter:card" content="summary_large_image">
            <meta name="twitter:title" content="${wordString}">
            <meta name="twitter:description" content="${definitionSnippet}">
            <meta name="twitter:image" content="${imageUrl}">
        `;

        // 2. Build the full HTML response with redirect
        const htmlResponse = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${wordString} | Domra Lexicon</title>
                ${metaTags}
                
                <meta http-equiv="refresh" content="0;url=${redirectUrl}">
            </head>
            <body>
                <h1>Redirecting to Word Card: ${wordString}</h1>
                <p>If you are not redirected, click here: <a href="${redirectUrl}">${redirectUrl}</a></p>
            </body>
            </html>
        `;

        // 3. Send the response as raw HTML
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(htmlResponse);

    } catch (error) {
        console.error('Error rendering shared page:', error);
        res.status(500).send('<h1>Internal Server Error</h1>');
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
 *       - in: query
 *         name: sortby
 *         schema:
 *           type: string
 *           enum: [EnglishWord, FrenchWord, KhmerWord, category]
 *         description: Field to sort by (default is EnglishWord)
 *       - in: query
 *         name: sort
 *         required: false
 *         description: Sort order for EnglishWord (asc or desc)
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *       - in: query
 *         name: categoryId
 *         required: false
 *         description: Filter words by category ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paginated list of word translations
 *       400:
 *         description: Invalid parameters
 *       500:
 *         description: Failed to retrieve words
 */

const findAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const sortBy = req.query.sortby || 'EnglishWord';
    const sortOrder = req.query.sort === 'desc' ? 'DESC' : 'ASC';
    const categoryId = req.query.categoryId;

    let order = [['EnglishWord', sortOrder]];
    let include = [{
      model: Category,
      as: 'Categories',
      attributes: ['categoryId', 'categoryName'],
      through: { attributes: [] },
    }];

    if (categoryId && categoryId !== "all") {
      include[0].where = { categoryId: categoryId };
    }

    if (['EnglishWord', 'KhmerWord', 'FrenchWord'].includes(sortBy)) {
      order = [[sortBy, sortOrder]];
    } else if (sortBy === 'category') {
      order = [[{ model: Category, as: 'Categories' }, 'categoryName', sortOrder]];
    }

    const words = await WordTranslation.findAndCountAll({
      limit,
      offset,
      include,
      distinct: true,
      order,
    });

    return res.status(200).json({
      totalItems: words.count,
      totalPages: Math.ceil(words.count / limit),
      currentPage: page,
      words: words.rows,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to retrieve words' });
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
  getPublicWordCard, 
  renderSharedCardPage,
};