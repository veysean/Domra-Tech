import express from 'express';
import correctionRequestController from '../controllers/correctionRequestController.js';

const router = express.Router();

router.post('/', correctionRequestController.createCorrectionRequest);
router.get('/', correctionRequestController.getAllCorrectionRequests);
router.get('/:id', correctionRequestController.getCorrectionRequestById);
router.put('/:id', correctionRequestController.updateCorrectionRequest);
router.delete('/:id', correctionRequestController.deleteCorrectionRequest);

export default router;
