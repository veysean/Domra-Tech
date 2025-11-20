import express from 'express';
import authController from '../controllers/authController.js';
import validation from '../middleware/validation.js';
import passport from 'passport';

const router = express.Router();


router.post('/register', validation.registerValidationRules(), validation.validate, authController.register);

router.post('/login',validation.loginValidationRules(), validation.validate, authController.login);
router.get('/verify-email', authController.verifyEmail);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post("/google-register", authController.googleRegister);

// Route to redirect to Google's login page
/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Redirect to Google's OAuth 2.0 login page
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects user to Google for authentication
 */

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Route to handle the callback from Google
/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Handle callback from Google OAuth 2.0
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects user to frontend on successful authentication
 *       401:
 *         description: Authentication failed, redirects to /login
 */

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    // Redirect to the frontend on success
    res.redirect('http://localhost:5173');
});
export default router;