import express from "express";
import {
  getProducts,
  getProductId,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";
import { adminOnly, verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/products', getProducts);
router.get("/products/:id",getProductId);
router.post('/products', adminOnly, createProduct);
router.patch('/products/:id', verifyUser,adminOnly, updateProduct);
router.delete('/products/:id', verifyUser,adminOnly, deleteProduct);

export default router