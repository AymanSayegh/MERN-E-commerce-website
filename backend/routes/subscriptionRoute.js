import express from "express";
import { subscribe } from "../controllers/subscriptionController.js";

const router = express.Router();

/* CREATE */
router.post("/subscribe", subscribe);

export default router;
