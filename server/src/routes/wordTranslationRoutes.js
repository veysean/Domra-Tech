import express from 'express';
import wordTranslationController from '../controllers/wordTranslationController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { checkSubscription, guestSearchLimiter } from '../middleware/subscription.js';

const router = express.Router();
const { verifyAuth } = authMiddleware;

// --- PUBLIC / FREE ROUTES ---
router.get('/words', wordTranslationController.findAll);
router.get('/wordcards/:wordId', wordTranslationController.getPublicWordCard);
router.get('/share/:wordId', wordTranslationController.renderSharedCardPage);

// --- PROTECTED / PRO ROUTES (Requires Login AND Payment) ---
router.get(
    '/words/search',
    authMiddleware.optionalAuth, // First, attempt to id user
    guestSearchLimiter, // Rate limitor for guests
    checkSubscription,  // Make sure they have a 'success' payment or aren't over the free limit
    wordTranslationController.searchWords
);
router.get(
    '/words/:wordId',
    verifyAuth,
    checkSubscription,
    wordTranslationController.findById
);

// --- ADMIN ROUTES (No changes needed here) ---
router.post('/admin/words', verifyAuth, authMiddleware.checkAdminRole, wordTranslationController.create);
router.put('/admin/words/:wordId', verifyAuth, authMiddleware.checkAdminRole, wordTranslationController.update);
router.delete('/admin/words/:wordId', verifyAuth, authMiddleware.checkAdminRole, wordTranslationController.remove);

export default router;