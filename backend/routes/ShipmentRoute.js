import express from "express";
import {
  getShipment,
  getShipmentById,
  createShipment,
  updateShipment,
  deleteShipment
} from "../controllers/shipmentController.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/shipments",verifyUser, getShipment);
router.get("/shipments/:id",verifyUser, getShipmentById);
router.post("/shipments",verifyUser, createShipment);
router.put("/shipments/:id",verifyUser, updateShipment);
router.delete("/shipments/:id",verifyUser, deleteShipment);

export default router