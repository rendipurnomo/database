import express from "express";
import {loginCustomer, Me, logoutCustomer, loginGoogle, callbackGoogle} from "../controllers/Auth.js";

const router = express.Router();

router.post("/login", loginCustomer);
router.get("/auth/google", loginGoogle);
router.get("/auth/google/callback", callbackGoogle);
router.get("/me", Me);
router.delete("/logout", logoutCustomer);

export default router