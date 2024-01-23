import express from "express";
import {
  getPayment,
  getPaymentById,
} from "../controllers/paymentController.js";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/payments",verifyUser,adminOnly, getPayment);
router.get("/payments/:id",verifyUser, getPaymentById);

export default router
