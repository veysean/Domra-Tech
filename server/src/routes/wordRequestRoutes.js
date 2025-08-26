import express from "express";
import {
    getAllWordRequests,
    createWordRequest,
    deleteWordRequest,
    updateWordRequest,
    getWordRequestById,
}
from "../controllers/wordRequestController.js"
//import { verifyAuth, checkAdminRole } from '../middleware/authMiddleware.js';


const WordRequestRouter = express.Router();
//CategoryRouter.use(authenticateToken);

WordRequestRouter.get('/', getAllWordRequests);
WordRequestRouter.get('/:id', getWordRequestById);
WordRequestRouter.post('/', createWordRequest);
WordRequestRouter.put('/:id', updateWordRequest);
WordRequestRouter.delete('/:id', deleteWordRequest);

export default WordRequestRouter;