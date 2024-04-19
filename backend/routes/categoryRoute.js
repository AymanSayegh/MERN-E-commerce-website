import express from "express";
import {
  getCategories,
  addCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

/* READ */
router.get("/getCategories", getCategories);

/* UPDATE */
router.post("/addCategory", addCategory);

export default router;
