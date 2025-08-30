import express from 'express';
import correctionRequestController from '../controllers/correctionRequestController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const { verifyAuth, checkAdminRole } = authMiddleware;
const router = express.Router();

router.post('/', verifyAuth, correctionRequestController.createCorrectionRequest);
router.get('/', verifyAuth, correctionRequestController.getAllCorrectionRequests);
router.get('/:id', verifyAuth, correctionRequestController.getCorrectionRequestById);
router.put('/:id', verifyAuth, correctionRequestController.updateCorrectionRequest);
router.delete('/:id', verifyAuth, correctionRequestController.deleteCorrectionRequest);

export default router;
