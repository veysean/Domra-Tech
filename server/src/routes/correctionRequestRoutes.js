import express from 'express';
import correctionRequestController from '../controllers/correctionRequestController.js';
import authMiddleware from '../middleware/authMiddleware.js';

import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
const { verifyAuth } = authMiddleware;
const router = express.Router();

router.post('/',upload.single("image"), correctionRequestController.createCorrectionRequest);
router.get('/',verifyAuth, correctionRequestController.getAllCorrectionRequests);
router.get('/:id', correctionRequestController.getCorrectionRequestById);
router.put('/:id',upload.single("image"), correctionRequestController.updateCorrectionRequest);
router.delete('/:id', correctionRequestController.deleteCorrectionRequest);

export default router;
