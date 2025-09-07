/**
 * @swagger
 * tags:
 *   name: User
 *   description: User endpoints
 */

import db from '../models/index.js';

const { User } = db;

//find all users
/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users with pagination and sorting
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
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
 *         name: sortField
 *         required: false
 *         description: Field to sort by (e.g., userId, email, firstName, lastName)
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortOrder
 *         required: false
 *         description: Sort direction (asc or desc)
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       200:
 *         description: Paginated list of users
 *       500:
 *         description: Failed to retrieve users
 */

const findAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const allowedSortFields = ['userId', 'email', 'firstName', 'lastName'];
    const sortField = allowedSortFields.includes(req.query.sortField) ? req.query.sortField : 'userId';
    const sortOrder = req.query.sortOrder === 'desc' ? 'DESC' : 'ASC';

    const users = await User.findAndCountAll({
      order: [[sortField, sortOrder]],
      limit,
      offset
    });

    return res.status(200).json({
      totalItems: users.count,
      totalPages: Math.ceil(users.count / limit),
      currentPage: page,
      users: users.rows
    });
  } catch (error) {
    console.error('Error retrieving users:', error);
    return res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

// Update user by ID
/**
 * @swagger
 * /admin/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [User]
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
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName, email, role } = req.body;

    const [updated] = await User.update(
      { firstName, lastName, email, role },
      { where: { userId } }
    );

    if (updated) {
      const updatedUser = await User.findByPk(userId);
      return res.status(200).json({ message: "User updated", user: updatedUser });
    }

    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.error("Update user error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * @swagger
 * /admin/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User]
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
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deleted = await User.destroy({ where: { userId } });

    if (deleted) {
      return res.status(200).json({ message: "User deleted successfully" });
    }

    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.error("Delete user error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

//get profile
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
    const userId = req.user.userId;
    
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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     firstName:
 *                       type: string
 *                       example: Alice
 *                     lastName:
 *                       type: string
 *                       example: Smith
 *                     email:
 *                       type: string
 *                       example: alice@example.com
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2023-01-01T00:00:00Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2023-01-02T00:00:00Z
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
 *     summary: delete the authenticated user's account
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
  findAll,
  getProfile,
  updateProfile,
  deleteAccount,
  updateUser,
  deleteUser,
};
