import jwt from 'jsonwebtoken';
import { auth } from '../services/firebaseService.js';

const verifyAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided. Authorization denied.' });
  }

  try {
    // Verify the token using your JWT secret key
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      userId: decodedToken.userId, // numeric PK
      uid: decodedToken.uid,       // Firebase UID
      email: decodedToken.email,
      role: decodedToken.role
    };


    // Call next() to pass the request to the next middleware or controller
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid. Authorization denied.' });
  }
};

// checks if the authenticated user is an admin
const checkAdminRole = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. You do not have permission to perform this action.' });
  }
  next();
};
// middleware/authentication.js
import admin from "firebase-admin";

export const verifyFirebaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const idToken = authHeader.split("Bearer ")[1];
    console.log("Received Authorization header:", authHeader.substring(0, 30) + "...");

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log("Decoded Firebase user:", decodedToken);

    // req.user = decodedToken; // attach user info to request
    req.user = {
      userId: decodedToken.uid,
      email: decodedToken.email,
      role: decodedToken.role || 'user'
    };
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};



export default { verifyAuth, checkAdminRole};

