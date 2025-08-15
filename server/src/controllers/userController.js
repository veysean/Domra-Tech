/**
 * @swagger
 * tags:
 *   name: User
 *   description: User endpoints
 */

import db from '../models/index.js';

const { User } = db;

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get the authenticated user's profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                   example: 1
 *                 firstName:
 *                   type: string
 *                   example: Alice
 *                 lastName:
 *                   type: string
 *                   example: Smith
 *                 email:
 *                   type: string
 *                   example: alice@example.com
 *                 role:
 *                   type: string
 *                   example: user
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

const getProfile = async (req, res) => {
  try {
    // The verifyAuth middleware added the userId to the request object
    const userId = req.userId;
    
    // Find the user by their ID
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] } 
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json(user);

  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({ message: 'Failed to retrieve user profile.' });
  }
};

export default {
  getProfile,
};