import express from "express";
import {
  addToCart,
  getProductsInCart,
  updateCartProductQuantity,
  removeFromCart,
  getCartItemsCount,
  emptyTheCart,
} from "../controllers/cartController.js";

const router = express.Router();

/* READ */
router.get("/getProductsInCart/:userId", getProductsInCart);
router.get("/getCartItemsCount/:userId", getCartItemsCount);

/* UPDATE */
router.post("/addToCart", addToCart);
router.put("/updateCartProductQuantity/:productId", updateCartProductQuantity);

/* DELETE */
router.delete("/removeFromCart/:productId", removeFromCart);
router.delete("/emptyTheCart/:userId", emptyTheCart);

export default router;
