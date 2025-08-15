import express from 'express';
import authController from '../controllers/authController.js';
import validation from '../middleware/validation.js';
import passport from 'passport';

const router = express.Router();


router.post('/register', validation.registerValidationRules(), validation.validate, authController.register);

router.post('/login',validation.loginValidationRules(), validation.validate, authController.login);

// Route to redirect to Google's login page
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Route to handle the callback from Google
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    // Redirect to your frontend on success
    res.redirect('http://localhost:3000');
});
export default router;