import express from "express";
import {
    getAllCategories,
    getCategoryById,
}
from "../controllers/categotyController.js"
import { verifyAuth, checkAdminRole } from '../middleware/authMiddleware.js';


const CategoryRouter = express.Router();
//CategoryRouter.use(authenticateToken);

CategoryRouter.get('/', getAllCategories);
CategoryRouter.get('/:id', getCategoryById);
// CategoryRouter.post('/', upload.single('image'), createCatering);
// CategoryRouter.put('/:id', upload.single('image'), updateCatering);
// CategoryRouter.delete('/:id', deleteCatering);

export default CategoryRouter;