import express from 'express';
import correctionRequestController from '../controllers/correctionRequestController.js';
import authMiddleware from '../middleware/authMiddleware.js';

import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
const { verifyAuth } = authMiddleware;
const router = express.Router();

router.post('/', verifyAuth, upload.single("image"), correctionRequestController.createCorrectionRequest);
router.get('/', verifyAuth, correctionRequestController.getAllCorrectionRequests);
router.get('/:id', correctionRequestController.getCorrectionRequestById);
router.put('/:id', verifyAuth, upload.single("image"), correctionRequestController.updateCorrectionRequest);
router.delete('/:id', verifyAuth, correctionRequestController.deleteCorrectionRequest);

export default router;
