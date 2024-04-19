import express from "express";
import { subscribe } from "../controllers/subscriptionController.js";

const router = express.Router();

/* UPDATE */
router.post("/subscribe", subscribe);

export default router;