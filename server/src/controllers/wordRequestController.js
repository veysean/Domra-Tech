import db from "../models/index.js";
import { Op } from 'sequelize';
/**
 * @swagger
 * tags:
 *   - name: WordRequest
 *     description: Endpoints for managing word requests
 */

/**
 * @swagger
 * /wordRequests:
 *   get:
 *     summary: Retrieve paginated word requests
 *     tags: [WordRequest]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A paginated list of word requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalItems:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       wordRequestId:
 *                         type: integer
 *                       newEnglishWord:
 *                         type: string
 *                       newFrenchWord:
 *                         type: string
 *                       newKhmerWord:
 *                         type: string
 *                       newDefinition:
 *                         type: string
 *                       newExample:
 *                         type: string
 *                       reference:
 *                         type: string
 *                       userId:
 *                         type: integer
 *                       status:
 *                         type: string
 *                         enum: [pending, accepted, denied, deleted]
 *                       check:
 *                         type: boolean

 *   post:
 *     summary: Submit a new word request
 *     tags: [WordRequest]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newEnglishWord
 *             properties:
 *               newEnglishWord:
 *                 type: string
 *               newFrenchWord:
 *                 type: string
 *               newKhmerWord:
 *                 type: string
 *               newDefinition:
 *                 type: string
 *               newExample:
 *                 type: string
 *               reference:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, accepted, denied, deleted]
 *               check:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Word request created successfully
 *       401:
 *         description: Unauthorized. Login required.
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /wordRequests/today:
 *   get:
 *     summary: Retrieve word requests created today
 *     tags: [WordRequest]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of word requests created today
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       wordRequestId:
 *                         type: integer
 *                       newEnglishWord:
 *                         type: string
 *                       newFrenchWord:
 *                         type: string
 *                       newKhmerWord:
 *                         type: string
 *                       newDefinition:
 *                         type: string
 *                       newExample:
 *                         type: string
 *                       reference:
 *                         type: string
 *                       userId:
 *                         type: integer
 *                       status:
 *                         type: string
 *                         enum: [pending, accepted, denied, deleted]
 *                       check:
 *                         type: boolean
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 */

/**
 * @swagger
 * /wordRequests/{id}:
 *   get:
 *     summary: Get a word request by ID
 *     tags: [WordRequest]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the word request
 *     responses:
 *       200:
 *         description: Word request retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 wordRequestId:
 *                   type: integer
 *                 newEnglishWord:
 *                   type: string
 *                 newFrenchWord:
 *                   type: string
 *                 newKhmerWord:
 *                   type: string
 *                 newDefinition:
 *                   type: string
 *                 newExample:
 *                   type: string
 *                 reference:
 *                   type: string
 *                 status:
 *                   type: string
 *                   enum: [pending, accepted, denied, deleted]
 *                 check:
 *                   type: boolean
 *                 User:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: integer
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     email:
 *                       type: string
 *       404:
 *         description: Word request not found
 *       500:
 *         description: Server error

 *   put:
 *     summary: Update a word request by ID
 *     tags: [WordRequest]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newEnglishWord:
 *                 type: string
 *               newFrenchWord:
 *                 type: string
 *               newKhmerWord:
 *                 type: string
 *               newDefinition:
 *                 type: string
 *               newExample:
 *                 type: string
 *               reference:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, accepted, denied, deleted]
 *               check:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Word request updated successfully
 *       404:
 *         description: Word request not found
 *       500:
 *         description: Server error

 *   delete:
 *     summary: Delete a word request by ID
 *     tags: [WordRequest]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Word request deleted successfully
 *       404:
 *         description: Word request not found
 *       500:
 *         description: Server error
 */


export const getAllWordRequests = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Apply filter: if not admin, only fetch user's own requests
    const whereCondition = req.user.role === 'admin'
      ? {} // no filter for admin
      : { userId: req.user.userId }; // filter for regular user

    const { count, rows } = await db.WordRequest.findAndCountAll({
      where: whereCondition,
      limit,
      offset,
      order: [['wordRequestId', 'DESC']],
      include: [
        {
          model: db.User,
          attributes: ['userId', 'firstName', 'lastName']
        }
      ]
    });

    res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching word requests:', error);
    res.status(500).json({ error: 'Failed to fetch word requests.' });
  }
};

export const getTodayWordRequests = async (req, res) => {
  try {
    // Get today's date range in local time
    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const endOfDay = new Date(now.setHours(23, 59, 59, 999));

    // Build filter: only today's requests
    const whereCondition = {
      createdAt: {
        [Op.between]: [startOfDay, endOfDay]
      },
      ...(req.user.role !== 'admin' && { userId: req.user.userId })
    };

    const wordRequests = await db.WordRequest.findAll({
      where: whereCondition,
      order: [['wordRequestId', 'DESC']],
      include: [
        {
          model: db.User,
          attributes: ['userId', 'firstName', 'lastName']
        }
      ]
    });

    res.status(200).json({ data: wordRequests });
  } catch (error) {
    console.error("Error fetching today's word requests:", error);
    res.status(500).json({ error: "Failed to fetch today's word requests." });
  }
};

// Get word request by ID
export const getWordRequestById = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await db.WordRequest.findByPk(id, {
      include: [
        {
          model: db.User,
          attributes: ['userId', 'firstName', 'lastName', 'email']
        }
      ]
    });

    if (!request) {
      return res.status(404).json({ error: 'Word request not found.' });
    }

    res.status(200).json(request);
  } catch (error) {
    console.error('Error fetching word request by ID:', error);
    res.status(500).json({ error: 'Failed to fetch word request.' });
  }
};

// Controller for fetching word requests with optional filters
export const getWordRequests = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, check, search } = req.query;

    const offset = (page - 1) * limit;
    const where = {};

    // Apply status filter if provided
    if (status) {
      where.status = status;
    }

    // Apply check filter if provided
    if (check === "checked") {
      where.check = true;
    } else if (check === "unchecked") {
      where.check = false;
    }

    // Apply search filter if provided
    if (search) {
      where.newEnglishWord = { [db.Sequelize.Op.like]: `%${search}%` };
    }

    const { count, rows } = await db.WordRequest.findAndCountAll({
      where,
      offset,
      limit: parseInt(limit),
      order: [["createdAt", "DESC"]],
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: rows,
    });
  } catch (error) {
    console.error("Error fetching word requests:", error);
    res.status(500).json({ error: "Failed to fetch word requests." });
  }
};

// Controller for making word requests from both user and admin
export const createWordRequest = async (req, res) => {
  try {
    const { newEnglishWord } = req.body;

    if (!newEnglishWord || typeof newEnglishWord !== 'string' || newEnglishWord.trim() === '') {
      return res.status(400).json({ error: 'newEnglishWord is required and must be a non-empty string.' });
    }

    const payload = {
      newEnglishWord: newEnglishWord.trim(),
      newFrenchWord: req.body.newFrenchWord || null,
      newKhmerWord: req.body.newKhmerWord || null,
      newDefinition: req.body.newDefinition || null,
      newExample: req.body.newExample || null,
      reference: req.body.reference || null,
      status: req.body.status || 'pending',
      check: req.body.check ?? false,
      userId: req.user.userId
    };

    const newRequest = await db.WordRequest.create(payload);
    res.status(201).json(newRequest);
  } catch (error) {
    console.error('Error creating word request:', error.message);
    res.status(500).json({ error: error.message });
  }
};


// Helper to capitalize the first letter
const capitalizeFirst = (str) => {
  if (!str || typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Controller for update the word requests from both user and admin
// If status is changed to "accepted", transfer it to Translation table
export const updateWordRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await db.WordRequest.findByPk(id);

    if (!request) {
      return res.status(404).json({ error: "Word request not found." });
    }

    // Update the request with incoming data
    await request.update(req.body);

    // If status is accepted, copy into WordTranslation
    if (request.status === "accepted") {
      // Check if translation already exists to avoid duplicates
      const existingTranslation = await db.WordTranslation.findOne({
        where: { EnglishWord: request.newEnglishWord }
      });

      if (!existingTranslation) {
        await db.WordTranslation.create({
          EnglishWord: capitalizeFirst(request.newEnglishWord),
          FrenchWord: capitalizeFirst(request.newFrenchWord),
          KhmerWord: capitalizeFirst(request.newKhmerWord),
          definition: capitalizeFirst(request.newDefinition),
          example: capitalizeFirst(request.newExample),
          imageURL: request.imageURL,
          reference: request.reference,
          referenceText: request.referenceText
        });
      }
    }

    return res.status(200).json(request);
  } catch (error) {
    console.error("Error updating word request:", error);
    return res.status(500).json({ error: "Failed to update word request." });
  }
};

// Controller for delete the word request that user created
export const deleteWordRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await db.WordRequest.findByPk(id);

    if (!request) {
      return res.status(404).json({ error: 'Word request not found.' });
    }

    await request.destroy();
    res.status(200).json({ message: 'Word request deleted successfully.' });
  } catch (error) {
    console.error('Error deleting word request:', error);
    res.status(500).json({ error: 'Failed to delete word request.' });
  }
};
