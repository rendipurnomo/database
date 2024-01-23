import express from "express";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
} from "../controllers/orderController.js";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/orders",verifyUser,adminOnly, getOrders);
router.get("/orders/:id",verifyUser, getOrderById);
router.post("/orders",verifyUser, createOrder);
router.patch("/orders/:id",verifyUser,adminOnly, updateOrder);
router.delete("/orders/:id",verifyUser,adminOnly, deleteOrder);

export default router