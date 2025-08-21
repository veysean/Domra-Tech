import express from 'express';
import userController from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', authMiddleware.verifyAuth, userController.getProfile);
router.put('/profile', authMiddleware.verifyAuth, userController.updateProfile);
router.delete('/profile', authMiddleware.verifyAuth, userController.deleteAccount);

export default router;