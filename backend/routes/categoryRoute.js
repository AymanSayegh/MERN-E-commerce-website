import express from "express";
import {
  getCategories,
  addCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

/* CREATE */
router.post("/addCategory", addCategory);

/* READ */
router.get("/getCategories", getCategories);

export default router;
