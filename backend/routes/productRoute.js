import express from "express";
import {
  addProduct,
  getAllProductsSorted,
  deleteProduct,
  getProductById,
  editProduct,
  getPopularProducts,
  getProductsByCategory,
  searchProducts,
} from "../controllers/productController.js";

const router = express.Router();

/* CREATE */
router.post("/addProduct", addProduct);

/* READ */
router.get("/getProductById/:productId", getProductById);
router.get("/getProductsByCategory", getProductsByCategory);
router.get("/getPopularProducts", getPopularProducts);
router.get("/getAllProductsSorted", getAllProductsSorted);
router.get("/searchProducts", searchProducts);

/* UPDATE */
router.put("/editProduct/:productId", editProduct);

/* DELETE */
router.post("/deleteProduct/:productId", deleteProduct);

export default router;
