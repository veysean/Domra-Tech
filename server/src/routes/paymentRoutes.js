import express from 'express';
import paymentController from '../controllers/paymentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Flutter calls this to get the KHQR string
//router.post('/bakong/generate-qr', authMiddleware.verifyAuth, paymentController.createBakongQR);

// Flutter calls this to check if the payment is "success" or "pending"
//router.get('/bakong/status/:paymentId', authMiddleware.verifyAuth, paymentController.checkStatus);

// NEW VERSION (No token for testing):
router.post('/bakong/generate-qr', paymentController.createBakongQR); 

// Do the same for status if you want to test that easily too
router.get('/bakong/status/:paymentId', paymentController.checkStatus);
export default router;