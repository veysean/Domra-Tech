/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */


import db from '../models/index.js';
import jwt from 'jsonwebtoken';

const { User } = db;


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user (traditional or Google)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Alice
 *               lastName:
 *                 type: string
 *                 example: Smith
 *               email:
 *                 type: string
 *                 format: email
 *                 example: alice@example.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: mysecurepassword
 *               googleId:
 *                 type: string
 *                 example: google-oauth2|1234567890
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully!
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
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
 *                     role:
 *                       type: string
 *                       example: user
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Validation error
 *       409:
 *         description: User with this email already exists
 *       500:
 *         description: Server error
 */

// This function now handles both traditional and third-party registration.
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, googleId } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists.' });
    }

    // Prepare user data for creation
    const userData = {
      firstName,
      lastName,
      email,
      role: 'user',
      googleId: googleId || null,
      password
    };

    // Conditionally add password for traditional registration
    if (password) {
      userData.password = password;
    }

    const newUser = await User.create(userData);

    // --- New: Generate a JWT for the new user upon successful registration ---
    const token = jwt.sign(
      { userId: newUser.userId, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    const userResponse = {
      userId: newUser.userId,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      role: newUser.role,
    };

    // Return the token along with the user response
    return res.status(201).json({ message: 'User registered successfully!', user: userResponse, token });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Failed to register user.', error: error.message });
  }
};


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user (traditional or Google)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: alice@example.com
 *               password:
 *                 type: string
 *                 example: mysecurepassword
 *               googleId:
 *                 type: string
 *                 example: google-oauth2|1234567890
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged in successfully!
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
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
 *                     role:
 *                       type: string
 *                       example: user
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

// This function now handles both traditional and third-party login.
const login = async (req, res) => {
  try {
    const { email, password, googleId } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if it's a traditional login (with password)
    if (password && user.password) {
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
    }
    // Check if it's a third-party login (with googleId)
    else if (googleId && user.googleId === googleId) {
      // User is authenticated, proceed
    }
    // No credentials provided or mismatch
    else {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT for both types of login
    const token = jwt.sign(
      { userId: user.userId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    const userResponse = {
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    return res.status(200).json({ message: 'Logged in successfully!', user: userResponse , token });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Failed to log in.', error: error.message });
  }
};


export default {
  register,
  login,
};