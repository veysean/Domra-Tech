import express from 'express';
import authController from '../controllers/authController.js';
import { registerValidationRules, loginValidationRules, validate } from '../middleware/validation.js';

const router = express.Router();


router.post('/register', registerValidationRules(), validate, authController.register);

router.post('/login',loginValidationRules(), validate, authController.login);

export default router;