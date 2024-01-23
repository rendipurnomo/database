import express from 'express';
import {
  getOrderItems,
  getOrderItemById,
} from '../controllers/orderItemController.js';
import { adminOnly, verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/orderitems', verifyUser, adminOnly, getOrderItems);
router.get('/orderitems/:id', verifyUser, getOrderItemById);

export default router;
