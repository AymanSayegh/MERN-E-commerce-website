import express from "express";
import {
  toggleFavorite,
  checkFavorite,
  getFavoriteProducts,
} from "../controllers/favoriteController.js";

const router = express.Router();

/* READ */
router.get("/getFavoriteProducts/:userId", getFavoriteProducts);

/* UPDATE */
router.post("/toggleFavorite", toggleFavorite);
router.post("/checkFavorite", checkFavorite);

export default router;
