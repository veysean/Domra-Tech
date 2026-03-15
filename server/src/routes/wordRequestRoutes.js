import express from "express";
import {
    getAllWordRequests,
    createWordRequest,
    deleteWordRequest,
    updateWordRequest,
    getWordRequestById,
    getTodayWordRequests,
    getWordRequests,
}
from "../controllers/wordRequestController.js"
import authMiddleware from '../middleware/authMiddleware.js';
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

const { verifyAuth } = authMiddleware;

const WordRequestRouter = express.Router();

WordRequestRouter.get('/all', verifyAuth, getAllWordRequests);
WordRequestRouter.get('/', verifyAuth, getWordRequests);
WordRequestRouter.get('/today', verifyAuth, getTodayWordRequests);
WordRequestRouter.get('/:id', verifyAuth, getWordRequestById);
WordRequestRouter.post('/', verifyAuth,upload.single("image"), createWordRequest);
WordRequestRouter.put('/:id', verifyAuth, upload.single("image"),updateWordRequest);
WordRequestRouter.delete('/:id', verifyAuth, deleteWordRequest);

export default WordRequestRouter;