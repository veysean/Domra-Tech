

import express from 'express';
import wordTranslationController from '../controllers/wordTranslationController.js';
import { verifyAuth, checkAdminRole } from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/words/search', wordTranslationController.searchWords);

router.get('/words', wordTranslationController.findAll);

router.get('/words/:wordId', wordTranslationController.findById);

router.post('/words', verifyAuth, checkAdminRole, wordTranslationController.create);

router.put('/words/:wordId', verifyAuth, checkAdminRole, wordTranslationController.update);

router.delete('/words/:wordId', verifyAuth, checkAdminRole, wordTranslationController.remove);

export default router;
