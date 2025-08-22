import express from "express";
import {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
}
from "../controllers/categotyController.js"
//import { verifyAuth, checkAdminRole } from '../middleware/authMiddleware.js';


const CategoryRouter = express.Router();
//CategoryRouter.use(authenticateToken);

CategoryRouter.get('/', getAllCategories);
CategoryRouter.get('/:id', getCategoryById);
CategoryRouter.post('/', createCategory);
CategoryRouter.put('/:id', updateCategory);
CategoryRouter.delete('/:id', deleteCategory);

export default CategoryRouter;