import express from 'express';
import favWordController from '../controllers/favWordController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/favorites', authMiddleware.verifyAuth, favWordController.getAllFavorites);
router.post('/favorites', authMiddleware.verifyAuth, favWordController.createFavorite);
router.delete('/favorites/:wordId', authMiddleware.verifyAuth, favWordController.deleteFavorite);

export default router;
