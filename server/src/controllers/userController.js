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

// Function to update user profile
/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Update the authenticated user's profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Alice
 *               lastName:
 *                 type: string
 *                 example: Smith
 *               email:
 *                 type: string
 *                 example: alice@example.com
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile updated successfully!
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { firstName, lastName, email } = req.body;
    
    const [updated] = await User.update({ firstName, lastName, email }, {
      where: { userId: userId }
    });

    if (updated) {
      const updatedUser = await User.findByPk(userId, {
        attributes: { exclude: ['password'] }
      });
      return res.status(200).json({ message: 'Profile updated successfully!', user: updatedUser });
    }

    return res.status(404).json({ message: 'User not found.' });

  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({ message: 'Failed to update user profile.', error: error.message });
  }
};

// Function to soft-delete a user account
/**
 * @swagger
 * /profile:
 *   delete:
 *     summary: Soft-delete the authenticated user's account
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Account deleted successfully.
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

const deleteAccount = async (req, res) => {
  try {
    const userId = req.userId;

    const deleted = await User.destroy({
      where: { userId: userId }
    });

    if (deleted) {
      return res.status(200).json({ message: 'Account deleted successfully.' });
    }

    return res.status(404).json({ message: 'User not found.' });

  } catch (error) {
    console.error('Delete account error:', error);
    return res.status(500).json({ message: 'Failed to delete account.', error: error.message });
  }
};

export default {
  getProfile,
  updateProfile,
  deleteAccount
};
