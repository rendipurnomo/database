import express from 'express';
import {
  getCategories,
  getCategoryId,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { adminOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/categories', getCategories);
router.get('/categories/:id', getCategoryId);
router.post('/categories', adminOnly, createCategory);
router.patch('/categories/:id', adminOnly, updateCategory);
router.delete('/categories/:id', adminOnly, deleteCategory);

export default router;
