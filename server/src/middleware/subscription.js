import db from '../models/index.js';
import rateLimit from 'express-rate-limit';

const { Payment, User } = db;

export const guestSearchLimiter = rateLimit({
  windowMs: 8 * 60 * 60 * 1000, // 8 hours
  max: 10, // Limit each IP to 10 requests per window
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Rate limit exceeded. Please subscribe for unlimited access.",
      requiresUpgrade: true
    });
  },
  skip: (req, res) => {
    // Skip this limiter if they are logged in. The checkSubscription will handle user limits.
    return req.user !== undefined; 
  }
});

export const checkSubscription = async (req, res, next) => {
  try {
    // 1. Extract data from the token (provided by authMiddleware)
    const userId = req.user?.userId || req.user?.id;
    const userRole = req.user?.role; // <--- This is the key change

    // If Guest, let them pass through. guestSearchLimiter is tracking them by IP.
    if (!userId) {
      return next(); 
    }

    // 2. ADMIN BYPASS: If they are an admin, they get unlimited searches
    if (userRole === 'admin') {
      return next(); 
    }

    // --- LOGIC FOR REGULAR USERS ONLY ---

    const EIGHT_HOURS_AGO = new Date(Date.now() - 8 * 60 * 60 * 1000);

    // 3. PRO CHECK: Check for successful payment
    const activeSubscription = await Payment.findOne({
      where: { userId: userId, status: 'success' }
    });

    if (activeSubscription) {
      return next(); 
    }

    // 4. TRIAL CHECK: Fetch the user for search limits
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    if (user.searchCount === null) user.searchCount = 0;

    // Reset count if 8 hours passed
    if (user.lastSearchAt && user.lastSearchAt < EIGHT_HOURS_AGO) {
      user.searchCount = 0;
    }

    // Block if limit reached (10 requests)
    if (user.searchCount >= 10) {
      return res.status(429).json({
        success: false,
        message: "Limit reached. Upgrade to Pro for unlimited searches.",
        requiresUpgrade: true
      });
    }

    // Increment trial usage
    user.searchCount += 1;
    user.lastSearchAt = new Date();
    await user.save();

    next();

  } catch (error) {
    console.error("SUBSCRIPTION_ERROR:", error);
    res.status(500).json({ message: "Error checking subscription status" });
  }
};