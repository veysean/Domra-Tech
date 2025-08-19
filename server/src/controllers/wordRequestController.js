import db from "../models/index.js";

/**
 * @swagger
 * /word-requests:
 *   get:
 *     summary: Retrieve all word requests
 *     tags: [WordRequest]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of word requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   wordRequestId:
 *                     type: integer
 *                     example: 1
 *                   newEnglishWord:
 *                     type: string
 *                     example: "Algorithm"
 *                   newFrenchWord:
 *                     type: string
 *                     example: "Algorithme"
 *                   newKhmerWord:
 *                     type: string
 *                     example: "អាល់ហ្គូរីតម៍"
 *                   newDefinition:
 *                     type: string
 *                     example: "A step-by-step procedure for solving a problem."
 *                   newExample:
 *                     type: string
 *                     example: "Sorting algorithms like quicksort and mergesort."
 *                   reference:
 *                     type: string
 *                     example: "Wikipedia, CS50"
 *                   userId:
 *                     type: integer
 *                     example: 101
 *                   status:
 *                     type: string
 *                     enum: [pending, accepted, denied, deleted]
 *                     example: "pending"

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
 *               - userId
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
 *               userId:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [pending, accepted, denied, deleted]
 *     responses:
 *       201:
 *         description: Word request submitted successfully
 *       500:
 *         description: Server error

 * /word-requests/{id}:
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

// Controller to get all word requests from user
export const getAllWordRequests = async (req, res) => {
  try {
    const requests = await db.WordRequest.findAll();
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching word requests:', error);
    res.status(500).json({ error: 'Failed to fetch word requests.' });
  }
};


// Controller for making word requests from both user and admin
export const createWordRequest = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      userId: req.body.userId || 1 // default userId for development
    };

    const newRequest = await db.WordRequest.create(payload);
    res.status(201).json(newRequest);
  } catch (error) {
    console.error('Error creating word request:', error);
    res.status(500).json({ error: 'Failed to create word request.' });
  }
};



//COntroller for update the word requests from both user and admin (Transfer it to Translation table)
export const updateWordRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await db.WordRequest.findByPk(id);

    if (!request) {
      return res.status(404).json({ error: 'Word request not found.' });
    }

    await request.update(req.body);
    res.status(200).json(request);
  } catch (error) {
    console.error('Error updating word request:', error);
    res.status(500).json({ error: 'Failed to update word request.' });
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
