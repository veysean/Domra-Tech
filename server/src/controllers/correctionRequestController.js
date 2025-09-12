import db from '../models/index.js';

const { CorrectionRequest } = db;

/**
 * @swagger
 * tags:
 *   - name: CorrectionRequests
 *     description: Manage correction requests for dictionary
 */

/**
 * @swagger
 * /correctionRequests:
 *   post:
 *     tags:
 *       - CorrectionRequests
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new correction request
 *     description: Allows a user to submit a correction request for a word.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - wordId
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               wordId:
 *                 type: integer
 *                 example: 10
 *               correctEnglishWord:
 *                 type: string
 *                 example: "example"
 *               correctFrenchWord:
 *                 type: string
 *                 example: "exemple"
 *               correctKhmerWord:
 *                 type: string
 *                 example: "ឧទាហរណ៍"
 *               reference:
 *                 type: string
 *                 example: "https://dictionary.cambridge.org/"
 *               status:
 *                 type: string
 *                 enum: [pending, approved, rejected]
 *                 default: pending
 *     responses:
 *       201:
 *         description: Correction request created successfully.
 *       400:
 *         description: Missing required fields or failed creation.
 */
const createCorrectionRequest = async (req, res) => {
  try {
     
    const payload = {
      userId: req.user.userId,
      ...req.body
    }

    if (!payload.userId || !payload.wordId) {
      return res.status(400).json({ message: 'userId and wordId are required.' });
    }

    const newRequest = await CorrectionRequest.create(payload);

    return res.status(201).json(newRequest);

  } catch (error) {
    console.error('Create correction request error:', error);
    return res.status(400).json({ message: 'Failed to create correction request.' });
  }
};


/**
 * @swagger
 * /correctionRequests:
 *   get:
 *     tags:
 *       - CorrectionRequests
 *     security:
 *       - bearerAuth: []
 *     summary: Get all correction requests
 *     description: Retrieve a paginated list of correction requests.
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
 *         description: A paginated list of correction requests.
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
 *                     $ref: '#/components/schemas/CorrectionRequest'
 *       500:
 *         description: Failed to retrieve correction requests.
 */
const getAllCorrectionRequests = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Apply filter: if not admin, only fetch user's own requests
    const whereCondition = req.user.role === 'admin'
      ? {} // no filter for admin
      : { userId: req.user.userId }; // filter for regular user

    const { count, rows } = await CorrectionRequest.findAndCountAll({
      where: whereCondition,
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: rows
    });
  } catch (error) {
    console.error('Get all correction requests error:', error);
    return res.status(500).json({ message: 'Failed to retrieve correction requests.' });
  }
};

/**
 * @swagger
 * /correctionRequests/{id}:
 *   get:
 *     tags:
 *       - CorrectionRequests
 *     security:
 *       - bearerAuth: []
 *     summary: Get a correction request by ID
 *     description: Retrieve a single correction request by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The correction request ID
 *     responses:
 *       200:
 *         description: Correction request retrieved successfully.
 *       404:
 *         description: Correction request not found.
 *       500:
 *         description: Failed to retrieve correction request.
 */
const getCorrectionRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await CorrectionRequest.findByPk(id);

    if (!request) {
      return res.status(404).json({ message: 'Correction request not found.' });
    }

    return res.status(200).json(request);
  } catch (error) {
    console.error('Get correction request by ID error:', error);
    return res.status(500).json({ message: 'Failed to retrieve correction request.' });
  }
};

/**
 * @swagger
 * /correctionRequests/{id}:
 *   put:
 *     tags:
 *       - CorrectionRequests
 *     security:
 *       - bearerAuth: []
 *     summary: Update a correction request
 *     description: Modify an existing correction request by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The correction request ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correctEnglishWord:
 *                 type: string
 *                 example: "updated example"
 *               correctFrenchWord:
 *                 type: string
 *                 example: "exemple mis à jour"
 *               correctKhmerWord:
 *                 type: string
 *                 example: "ឧទាហរណ៍ថ្មី"
 *               reference:
 *                 type: string
 *                 example: "https://merriam-webster.com/"
 *               status:
 *                 type: string
 *                 enum: [pending, accepted, denied, deleted]
 *                 example: "accepted"
 *     responses:
 *       200:
 *         description: Correction request updated successfully.
 *       404:
 *         description: Correction request not found.
 *       400:
 *         description: Failed to update correction request.
 */
const updateCorrectionRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await CorrectionRequest.findByPk(id);

    if (!request) {
      return res.status(404).json({ message: 'Correction request not found.' });
    }

    await request.update(req.body);

    return res.status(200).json(request);
  } catch (error) {
    console.error('Update correction request error:', error);
    return res.status(400).json({ message: 'Failed to update correction request.' });
  }
};


/**
 * @swagger
 * /correctionRequests/{id}:
 *   delete:
 *     tags:
 *       - CorrectionRequests
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a correction request
 *     description: Remove a correction request by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The correction request ID
 *     responses:
 *       200:
 *         description: Correction request deleted successfully.
 *       404:
 *         description: Correction request not found.
 *       500:
 *         description: Failed to delete correction request.
 */
const deleteCorrectionRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await CorrectionRequest.destroy({
      where: { correctionId: id }
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Correction request not found.' });
    }

    return res.status(200).json({ message: 'Correction request deleted successfully.' });
  } catch (error) {
    console.error('Delete correction request error:', error);
    return res.status(500).json({ message: 'Failed to delete correction request.' });
  }
};

export default {
  createCorrectionRequest,
  getAllCorrectionRequests,
  getCorrectionRequestById,
  updateCorrectionRequest,
  deleteCorrectionRequest
};
