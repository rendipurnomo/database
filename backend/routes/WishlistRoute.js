import express from "express";
import {
  getWishList,
  createWishList,
  deleteWishList
} from "../controllers/wishListController.js";
import { verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get("/wishlists",verifyUser, getWishList);
router.post("/wishlists",verifyUser, createWishList);
router.delete("/wishlists/:id",verifyUser, deleteWishList);

export default router