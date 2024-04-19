import express from "express";
import { login, signup, authenticate } from "../controllers/userController.js";
import { verifyToken } from "../utils/auth.js";

const router = express.Router();

/* READ */
router.get("/authenticate", verifyToken, authenticate);

/* UPDATE */
router.post("/login", login);
router.post("/signup", signup);

export default router;
