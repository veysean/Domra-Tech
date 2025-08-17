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
 * /correction-requests:
 *   post:
 *     tags:
 *       - CorrectionRequests
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
    const {
      userId,
      wordId,
      correctEnglishWord,
      correctFrenchWord,
      correctKhmerWord,
      reference,
      status
    } = req.body;

    if (!userId || !wordId) {
      return res.status(400).json({ message: 'userId and wordId are required.' });
    }

    const newRequest = await CorrectionRequest.create({
      userId,
      wordId,
      correctEnglishWord,
      correctFrenchWord,
      correctKhmerWord,
      reference,
      status: status || 'pending'
    });

    return res.status(201).json(newRequest);
  } catch (error) {
    console.error('Create correction request error:', error);
    return res.status(400).json({ message: 'Failed to create correction request.' });
  }
};

/**
 * @swagger
 * /correction-requests:
 *   get:
 *     tags:
 *       - CorrectionRequests
 *     summary: Get all correction requests
 *     description: Retrieve a list of all submitted correction requests.
 *     responses:
 *       200:
 *         description: A list of correction requests.
 *       500:
 *         description: Failed to retrieve correction requests.
 */
const getAllCorrectionRequests = async (req, res) => {
  try {
    const requests = await CorrectionRequest.findAll();
    return res.status(200).json(requests);
  } catch (error) {
    console.error('Get all correction requests error:', error);
    return res.status(500).json({ message: 'Failed to retrieve correction requests.' });
  }
};

/**
 * @swagger
 * /correction-requests/{id}:
 *   get:
 *     tags:
 *       - CorrectionRequests
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
 * /correction-requests/{id}:
 *   put:
 *     tags:
 *       - CorrectionRequests
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
 * /correction-requests/{id}:
 *   delete:
 *     tags:
 *       - CorrectionRequests
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
