import express from 'express';
import userController from '../controllers/userController.js';
import verifyAuth from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/profile:
 * get:
 * summary: Get user profile
 * description: Retrieve the profile information for the authenticated user. This is a protected route.
 * tags:
 * - Users
 * security:
 * - bearerAuth: [] # Indicates that this endpoint requires a Bearer token (JWT) for authentication.
 * responses:
 * '200':
 * description: User profile retrieved successfully.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * userId:
 * type: integer
 * description: The user's unique ID.
 * example: 1
 * firstName:
 * type: string
 * description: The user's first name.
 * example: John
 * lastName:
 * type: string
 * description: The user's last name.
 * example: Doe
 * email:
 * type: string
 * format: email
 * description: The user's email address.
 * example: john.doe@example.com
 * role:
 * type: string
 * enum: [user, admin]
 * description: The user's role.
 * example: user
 * '401':
 * description: Unauthorized - No token provided or token is invalid/expired.
 * '404':
 * description: User not found (e.g., if the user ID from the token doesn't exist).
 * '500':
 * description: Server error.
 */
router.get('/profile', verifyAuth, userController.getProfile);

export default router;