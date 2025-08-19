import express from 'express';
import userController from '../controllers/userController.js';
import { verifyAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', verifyAuth, userController.getProfile);
router.put('/profile', verifyAuth, userController.updateProfile);
router.delete('/profile', verifyAuth, userController.deleteAccount);

export default router;