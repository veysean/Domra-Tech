// import express from 'express';
// import authController from '../controllers/authController.js';
// import validation from '../middleware/validation.js';
// import passport from 'passport';

// const router = express.Router();


// router.post('/register', validation.registerValidationRules(), validation.validate, authController.register);

// router.post('/login',validation.loginValidationRules(), validation.validate, authController.login);
// router.get('/verify-email', authController.verifyEmail);
// router.post('/forgot-password', authController.forgotPassword);
// router.post('/reset-password', authController.resetPassword);
// router.post("/google-register", authController.googleRegister);
// app.post("/auth/firebase-login", async (req, res) => {
//   const idToken = req.headers.authorization?.split("Bearer ")[1];
//   try {
//     const decoded = await admin.auth().verifyIdToken(idToken);
//     // decoded contains uid, email, etc.
//     // You can create or fetch a local user record here
//     res.json({ message: "Authenticated", user: decoded });
//   } catch (error) {
//     res.status(401).json({ error: "Invalid token" });
//   }
// });


// // Route to redirect to Google's login page
// /**
//  * @swagger
//  * /auth/google:
//  *   get:
//  *     summary: Redirect to Google's OAuth 2.0 login page
//  *     tags: [Auth]
//  *     responses:
//  *       302:
//  *         description: Redirects user to Google for authentication
//  */

// router.get('/google',
//     passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// // Route to handle the callback from Google
// /**
//  * @swagger
//  * /auth/google/callback:
//  *   get:
//  *     summary: Handle callback from Google OAuth 2.0
//  *     tags: [Auth]
//  *     responses:
//  *       302:
//  *         description: Redirects user to frontend on successful authentication
//  *       401:
//  *         description: Authentication failed, redirects to /login
//  */

// router.get('/google/callback', passport.authenticate('google'), (req, res) => {
//     // Redirect to the frontend on success
//     res.redirect('http://localhost:5173');
// });
// export default router;

import express from "express";
import authController from "../controllers/authController.js";
import validation from "../middleware/validation.js";
import passport from "passport";
// import aithentication from "../middleware/authMiddleware.js";
import { verifyFirebaseToken } from "../middleware/authMiddleware.js";
import db from "../models/index.js";

const router = express.Router();
const { User } = db;

// Existing routes
router.post("/register", validation.registerValidationRules(), validation.validate, authController.register);
router.post("/login", validation.loginValidationRules(), validation.validate, authController.login);
router.get("/verify-email", authController.verifyEmail);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/google-register", authController.googleRegister);

// Firebase-protected route
router.post("/firebase-login", verifyFirebaseToken, async (req, res) => {
  const firebaseUser = req.user; // decoded token

  try {
    // Find user by email or Firebase UID
    let user = await User.findOne({ where: { email: firebaseUser.email } });

    if (!user) {
      // Create a new user record if not found
      user = await User.create({
        email: firebaseUser.email,
        role: "user",
        status: "unverified",
      });
    }

    res.json({ message: "Firebase login successful", user });
  } catch (error) {
    console.error("DB error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Example of protecting another route
router.get("/profile", verifyFirebaseToken, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

// Google OAuth routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect("http://localhost:5173");
});

export default router;
