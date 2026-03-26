import express from "express";
import authController from "../controllers/authController.js";
import validation from "../middleware/validation.js";
import passport from "passport";
// import aithentication from "../middleware/authMiddleware.js";
import { verifyFirebaseToken } from "../middleware/authMiddleware.js";
import jwt from "jsonwebtoken";
import { auth } from "../services/firebaseService.js";
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


// Firebase signup with extra fields
router.post("/firebase-signup", async (req, res) => {
  const { email, firstName, lastName, gender, dob, firebaseToken } = req.body;

  try {
    const decoded = await auth.verifyIdToken(firebaseToken);

    // Always use decoded.uid, not req.body.uid
    let user = await User.findOne({ where: { uid: decoded.uid } });
    if (!user) {
      user = await User.create({
        uid: decoded.uid,
        email: decoded.email || email, 
        firstName,
        lastName,
        gender,
        dob,
      });
    }

    const backendToken = jwt.sign(
      { uid: decoded.uid, email: decoded.email,userId: decoded.uid },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ jwt: backendToken, user });
  } catch (err) {
    res.status(401).json({ error: "Invalid Firebase token" });
  }
});

// Firebase login
router.post("/firebase-login", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(400).json({ error: "Missing token" });

  const idToken = authHeader.split(" ")[1];
  console.log("Received token:", idToken);
  try {
    const decoded = await auth.verifyIdToken(idToken);
    console.log("Decoded:", decoded);

    const user = await User.findOne({ where: { uid: decoded.uid } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const backendToken = jwt.sign(
    {
      userId: user.userId,       // numeric PK from DB
      uid: decoded.uid,          // Firebase UID
      email: decoded.email,
      role: "user"
    },
      process.env.JWT_SECRET,
    { expiresIn: "7d" }
    );


    res.json({ jwt: backendToken, user });
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ error: "Invalid Firebase token" });
  }
});

// Google register/login
router.post("/googleRegister", async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = await auth.verifyIdToken(token);

    let user = await User.findOne({ where: { uid: decoded.uid } });
    if (!user) {
      user = await User.create({
        uid: decoded.uid,
        email: decoded.email,
        firstName: decoded.name?.split(" ")[0] || "",
        lastName: decoded.name?.split(" ")[1] || "",
      });
    }

    const backendToken = jwt.sign(
    {
      userId: user.userId,       // numeric PK from DB
      uid: decoded.uid,          // Firebase UID
      email: decoded.email,
      role: "user"
    },
      process.env.JWT_SECRET,
    { expiresIn: "7d" }
    );


    res.json({ jwt: backendToken, user });
  } catch (err) {
    res.status(401).json({ error: "Invalid Firebase token" });
  }
});


// Google OAuth routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect("http://localhost:5173");
});

export default router;
