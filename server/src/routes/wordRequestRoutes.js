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

const { verifyAuth } = authMiddleware;

const WordRequestRouter = express.Router();

WordRequestRouter.get('/all', verifyAuth, getAllWordRequests);
WordRequestRouter.get('/', verifyAuth, getWordRequests);
WordRequestRouter.get('/today', verifyAuth, getTodayWordRequests);
WordRequestRouter.get('/:id', verifyAuth, getWordRequestById);
WordRequestRouter.post('/', verifyAuth, createWordRequest);
WordRequestRouter.put('/:id', verifyAuth, updateWordRequest);
WordRequestRouter.delete('/:id', verifyAuth, deleteWordRequest);

export default WordRequestRouter;