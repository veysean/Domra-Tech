/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */


import db from '../models/index.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'; 
import bcrypt from 'bcryptjs';
import emailService from '../services/emailService.js';
import { Op } from 'sequelize'; 


const { User } = db;

// handles both traditional and third-party registration
// handles both traditional and third-party registration
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user (traditional or Google)
 *     description: Creates a new user account using either traditional email/password or Google ID. Sends a verification email upon successful registration. No token is issued until the email is verified.
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
 *         description: User registered successfully. Verification email sent.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully. Please check your email to verify your account.
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Validation failed.
 *       409:
 *         description: User with this email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User with this email already exists.
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to register user.
 */

// const register = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password, googleId } = req.body;

//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(409).json({ message: 'User with this email already exists.' });
//     }

//     const verificationToken = crypto.randomBytes(32).toString('hex');
//     const userData = {
//       firstName,
//       lastName,
//       email,
//       role: 'user',
//       googleId: googleId || null,
//       emailVerificationToken: verificationToken,
//       emailVerificationExpires: new Date(Date.now() + 3600000), // 1 hour
//       status: 'unverified',
//     };

//     if (password) {
//       userData.password = password;
//     }

//     const newUser = await User.create(userData);
    
//     await emailService.sendVerificationEmail(newUser.email, verificationToken);

//     // No JWT is generated here. The user must verify their email first.
//     return res.status(201).json({ message: 'User registered successfully. Please check your email to verify your account.' });

//   } catch (error) {
//     console.error('Registration error:', error);
//     return res.status(500).json({ message: 'Failed to register user.', error: error.message });
//   }
// };

  const register = async (req, res) => {
    try {
      const { firstName, lastName, email, password, googleId } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ message: 'User with this email already exists.' });
      }

      const userData = {
        firstName,
        lastName,
        email,
        role: 'user',
        googleId: googleId || null,
        status: googleId ? 'verified' : 'unverified',
      };

      if (password) {
        userData.password = password;
      }

      if (!googleId) {
        const verificationToken = crypto.randomBytes(32).toString('hex');
        userData.emailVerificationToken = verificationToken;
        userData.emailVerificationExpires = new Date(Date.now() + 3600000); // 1 hour
      }

      const newUser = await User.create(userData);

      if (!googleId) {
        await emailService.sendVerificationEmail(newUser.email, userData.emailVerificationToken);
        return res.status(201).json({ message: 'User registered successfully. Please check your email to verify your account.' });
      }

      // For Google sign-up, return JWT immediately
      const jwtToken = jwt.sign(
        { userId: newUser.userId, role: newUser.role, status: newUser.status },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.status(201).json({ message: 'Google sign-up successful.', token: jwtToken });

    } catch (error) {
      console.error('Registration error:', error);
      return res.status(500).json({ message: 'Failed to register user.', error: error.message });
    }
  };

// Controller for google register
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleRegister = async (req, res) => {
  try {
    const { token } = req.body;

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, given_name, family_name, sub } = payload;

    // Check if user exists
    let user = await User.findOne({ where: { email } });

    if (!user) {
      // Create new user
      user = await User.create({
        firstName: given_name,
        lastName: family_name,
        email,
        googleId: sub,
        status: "verified",
        role: "user",
      });
    }

    // Generate JWT
    const jwtToken = jwt.sign(
      { userId: user.userId, role: user.role, status: user.status },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "Google sign-up successful", token: jwtToken });
  } catch (error) {
    console.error("Google sign-up error:", error);
    return res.status(500).json({ message: "Google sign-up failed", error: error.message });
  }
};

// function to verifies the email token
/**
 * @swagger
 * /auth/verify-email:
 *   get:
 *     summary: Verify user's email using a token
 *     description: Verifies a user's email address using a token sent via email. If the token is valid and not expired, the user's status is updated to "verified" and a JWT is returned.
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The email verification token sent to the user's email.
 *     responses:
 *       200:
 *         description: Email verified successfully and JWT returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email verified successfully. You are now logged in.
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Verification token is invalid or has expired.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Verification token is invalid or has expired.
 *       500:
 *         description: Server error during email verification.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to verify email.
 */

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    const user = await User.findOne({
      where: {
        emailVerificationToken: token,
      }
    });

    // Correct: First, check if the user exists or if the token is expired.
    if (!user || user.emailVerificationExpires < Date.now()) {
      return res.status(400).json({ message: 'Verification token is invalid or has expired.' });
    }

    user.status = 'verified';
    user.emailVerificationToken = null; // Invalidate the token
    user.emailVerificationExpires = null;
    await user.save();

    const jwtToken = jwt.sign(
      { userId: user.userId, role: user.role, status: user.status },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Email verified successfully. You are now logged in.',
      token: jwtToken
    });

  } catch (error) {
    console.error('Email verification error:', error);
    return res.status(500).json({ message: 'Failed to verify email.', error: error.message });
  }
};

// handles both traditional and third-party login
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
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

// const login = async (req, res) => {
//   try {
//     const { email, password, googleId } = req.body;
    
//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     // Check if it's a traditional login (with password)
//     if (password) {
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(401).json({ message: 'Invalid credentials.' });
//       }
//     } else if (googleId && user.googleId === googleId) {
//       // Google login
//     } else {
//       return res.status(401).json({ message: 'Invalid credentials.' });
//     }

//     // Generate JWT for both types of login
//     const token = jwt.sign(
//       { userId: user.userId, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );
    
//     const userResponse = {
//       userId: user.userId,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       role: user.role,
//     };

//     return res.status(200).json({ message: 'Logged in successfully!', user: userResponse , token });

//   } catch (error) {
//     console.error('Login error:', error);
//     return res.status(500).json({ message: 'Failed to log in.', error: error.message });
//   }
// };

  const login = async (req, res) => {
    try {
      const { email, password, googleId } = req.body;

      // 1. Find user by email
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      // 2. Traditional login (password-based)
      if (password) {
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials." });
        }
      }
      // 3. Third-party login (Google)
      else if (googleId && user.googleId === googleId) {
        // User authenticated via Google
      }
      // 4. If neither condition matches
      else {
        return res.status(401).json({ message: "Invalid credentials." });
      }

      // 5. Generate JWT
      const token = jwt.sign(
        { userId: user.userId, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // 6. Prepare response payload
      const userResponse = {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      };

      return res.status(200).json({
        message: "Logged in successfully!",
        user: userResponse,
        token,
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({
        message: "Failed to log in.",
        error: error.message,
      });
    }
  };

// Function to handle forgot password
/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request a password reset link
 *     description: Sends a password reset link to the user's email if the email exists in the system.
 *     tags:
 *       - Auth
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
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Password reset link sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset link sent to your email.
 *       404:
 *         description: User with the provided email does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User with this email does not exist.
 *       500:
 *         description: Internal server error.
 */

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User with this email does not exist.' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.passwordResetToken = hashedToken;
        user.passwordResetExpires = Date.now() + 3600000; // 1 hour

        await user.save();

        const resetURL = `${process.env.FRONTEND_URL}/auth/reset-password?token=${resetToken}`;

        await emailService.sendPasswordResetEmail(user.email, resetURL);

        return res.status(200).json({ message: 'Password reset link sent to your email.' });

    } catch (error) {
        console.error('Forgot password error:', error);
        return res.status(500).json({ message: 'Failed to send password reset link.' });
    }
};

// Function to reset password
/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset user password
 *     description: Resets the user's password using a valid reset token.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *             properties:
 *               token:
 *                 type: string
 *                 example: 123456abcdef
 *               password:
 *                 type: string
 *                 format: password
 *                 example: NewSecurePassword123!
 *               confirmPassword:
 *                  type: string
 *                  format: password
 *                  example: NewSecurePassword123!
 *     responses:
 *       200:
 *         description: Password has been reset successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password has been reset successfully.
 *       400:
 *         description: Token is invalid or has expired.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token is invalid or has expired.
 *       500:
 *         description: Internal server error.
 */


// const resetPassword = async (req, res) => {
//   try {
//     const { token, password, confirmPassword } = req.body;

//     // 1. Check password confirmation
//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: 'Passwords do not match.' });
//     }

//     // 2. Hash the token and find user
//     const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
//     const user = await User.findOne({
//       where: {
//         passwordResetToken: hashedToken,
//         passwordResetExpires: { [Op.gt]: Date.now() }
//       }
//     });

//     if (!user) {
//       return res.status(400).json({ message: 'Token is invalid or has expired.' });
//     }

//     // 3. Hash the new password
//     user.password = await bcrypt.hash(password, 12);

//     // 4. Clear reset fields
//     user.passwordResetToken = null;
//     user.passwordResetExpires = null;

//     await user.save();

//     return res.status(200).json({ message: 'Password has been reset successfully.' });

//   } catch (error) {
//     console.error('Reset password error:', error);
//     return res.status(500).json({ message: 'Internal server error.' });
//   }
// };

  const resetPassword = async (req, res) => {
    try {
      const { token, password, confirmPassword } = req.body;

      // 1. Check password confirmation
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
      }

      // 2. Hash the token and find user
      const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
      const user = await User.findOne({
        where: {
          passwordResetToken: hashedToken,
          passwordResetExpires: { [Op.gt]: Date.now() },
        },
      });

      if (!user) {
        return res.status(400).json({ message: "Token is invalid or has expired." });
      }

      // 3. Assign plain password (hooks will hash automatically)
      user.password = password;

      // 4. Clear reset fields
      user.passwordResetToken = null;
      user.passwordResetExpires = null;

      // 5. Save user (beforeUpdate hook will hash password)
      await user.save();

      return res.status(200).json({ message: "Password has been reset successfully." });
    } catch (error) {
      console.error("Reset password error:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  };


export default {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  googleRegister
};