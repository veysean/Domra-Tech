import express from "express";
import {
    getAllWordRequests,
    createWordRequest,
    deleteWordRequest,
    updateWordRequest,
    getWordRequestById,
    getTodayWordRequests,
}
from "../controllers/wordRequestController.js"
import authMiddleware from '../middleware/authMiddleware.js';

const { verifyAuth, checkAdminRole } = authMiddleware;

const WordRequestRouter = express.Router();

WordRequestRouter.get('/', verifyAuth, getAllWordRequests);
WordRequestRouter.get('/today', verifyAuth, getTodayWordRequests);
WordRequestRouter.get('/:id', verifyAuth, getWordRequestById);
WordRequestRouter.post('/', verifyAuth, createWordRequest);
WordRequestRouter.put('/:id', verifyAuth, updateWordRequest);
WordRequestRouter.delete('/:id', verifyAuth, deleteWordRequest);

export default WordRequestRouter;