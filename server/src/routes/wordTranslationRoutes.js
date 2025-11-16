import express from 'express';
import wordTranslationController from '../controllers/wordTranslationController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
const { verifyAuth } = authMiddleware;

router.get('/words/search', wordTranslationController.searchWords);
router.get('/words', wordTranslationController.findAll);
router.get('/words/:wordId', wordTranslationController.findById);

router.get('/wordcards/:wordId', wordTranslationController.getPublicWordCard);
router.get('/share/:wordId', wordTranslationController.renderSharedCardPage);
router.get('/words/:wordId/share', wordTranslationController.findById);

router.post('/admin/words', authMiddleware.verifyAuth, authMiddleware.checkAdminRole, wordTranslationController.create);
router.put('/admin/words/:wordId', authMiddleware.verifyAuth, authMiddleware.checkAdminRole, wordTranslationController.update);
router.delete('/admin/words/:wordId', authMiddleware.verifyAuth, authMiddleware.checkAdminRole, wordTranslationController.remove);

export default router;
