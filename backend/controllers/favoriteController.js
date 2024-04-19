import Favorite from "../models/favoriteSchema.js";
import Product from "../models/productSchema.js";

/**
 * Add a product to favorites if it does not exist and remove it from favorites if it already exists
 */
export const toggleFavorite = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId) {
      return res.status(404).json({ message: "Please send the user id" });
    }

    if (!productId) {
      return res.status(404).json({ message: "Please send the product id" });
    }

    const existingFavoriteItem = await Favorite.find({
      user: userId,
      product: productId,
    });

    // if not added to favorites before
    if (existingFavoriteItem.length === 0) {
      await Favorite.create({
        user: userId,
        product: productId,
      });

      await Product.findByIdAndUpdate(
        productId,
        { $inc: { favorites: 1 } }, // Use $inc operator to increment the favorites count by 1
        { new: true } // Return the updated document
      );

      return res
        .status(201)
        .json({ message: "Product added to favorites successfully" });
    } else {
      await Favorite.deleteMany({
        user: userId,
        product: productId,
      });

      await Product.findByIdAndUpdate(
        productId,
        { $inc: { favorites: -1 } }, // Use $inc operator to decrement the favorites count by 1
        { new: true } // Return the updated document
      );

      return res
        .status(200)
        .json({ message: "Product removed from favorites successfully" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**
 * Check if the product has already been added to favorites(for the favorites icon)
 */
export const checkFavorite = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId) {
      return res.status(404).json({ message: "Please send the user id" });
    }

    if (!productId) {
      return res.status(404).json({ message: "Please send the product id" });
    }

    const existingFavoriteItem = await Favorite.find({
      user: userId,
      product: productId,
    });

    return res
      .status(200)
      .json({ isFavorite: existingFavoriteItem.length > 0 });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**
 * Get all the products that a user has added to favorites
 */
export const getFavoriteProducts = async (req, res) => {
  try {
    const { userId } = req.params;
    const { selectedSort } = req.query;

    if (!userId) {
      return res.status(404).json({ message: "Please provide the user id" });
    }

    let sortOption = {};

    switch (selectedSort) {
      case "popular":
        sortOption = { favorites: -1 }; // Sort by favorites count (descending order)
        break;
      case "price-high-to-low":
        sortOption = { price: -1 }; // Sort by price (high to low)
        break;
      case "price-low-to-high":
        sortOption = { price: 1 }; // Sort by price (low to high)
        break;
    }

    // Get all the favorite items for this user
    const favoriteProducts = await Favorite.find({ user: userId });

    // Extract the id of the products that was added to favorites by this user
    const productIds = favoriteProducts.map((favorite) => favorite.product);

    // Get the product details of all the products added to favorites and sort them
    const products = await Product.find({ _id: { $in: productIds } }).sort(
      sortOption
    );

    return res
      .status(200)
      .json({ products, message: "Favorite products retrieved successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
