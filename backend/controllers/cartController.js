import { products } from "../data/index.js";
import Cart from "../models/cartSchema.js";
import Product from "../models/productSchema.js";

/*
 * Add a product to the cart with the corresponding user id
 */
export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId) {
      return res.status(404).json({ message: "Please provide the user id" });
    }

    if (!productId) {
      return res.status(404).json({ message: "Please provide the product id" });
    }

    if (!quantity) {
      return res.status(404).json({ message: "Please provide the quantity" });
    }

    const checkIfAddedBefore = await Cart.find({
      user: userId,
      product: productId,
    });

    if (checkIfAddedBefore.length > 0) {
      return res.json({ message: "Product already exists in the cart" });
    }

    const addToCart = await Cart.create({
      user: userId,
      product: productId,
      quantity,
    });

    return res
      .status(201)
      .json({ message: "Product added to cart successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/*
 * Get all the products that a user has added to cart
 */
export const getProductsInCart = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(404).json({ message: "Please provide the user id" });
    }

    // Get all the products corresponding to this user
    const productsInCart = await Cart.find({ user: userId }).populate(
      "product"
    );

    // Iterate over each cart item and construct product details with cartQuantity added
    const productDetails = productsInCart.map((cartItem) => ({
      _id: cartItem.product._id,
      name: cartItem.product.name,
      description: cartItem.product.description,
      price: cartItem.product.price,
      quantity: cartItem.product.quantity,
      category: cartItem.product.category,
      image: cartItem.product.image,
      favorites: cartItem.product.favorites,
      cartQuantity: cartItem.quantity,
      createdAt: cartItem.product.createdAt,
      updatedAt: cartItem.product.updatedAt,
      __v: cartItem.product.__v,
    }));

    return res.status(200).json({
      products: productDetails,
      message: "Products in cart retrieved successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/*
 * Update the quantity of the cart item
 */
export const updateCartProductQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId, newQuantity } = req.body;

    if (!productId) {
      return res.status(404).json({ message: "Please provide the product id" });
    }

    if (!userId) {
      return res.status(404).json({ message: "Please provide the user id" });
    }

    const updateQuantity = await Cart.findOneAndUpdate(
      { user: userId, product: productId },
      { quantity: newQuantity },
      { new: true }
    );

    return res.status(201).json({ message: "Quantity updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/*
 * Remove an item from the cart
 */
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId } = req.body;

    if (!productId) {
      return res.status(404).json({ message: "Please provide the product id" });
    }

    if (!userId) {
      return res.status(404).json({ message: "Please provide the user id" });
    }

    const removeItem = await Cart.findOneAndDelete({
      user: userId,
      product: productId,
    });

    return res
      .status(200)
      .json({ message: "Product removed from cart successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/*
 * Get how many items are in the cart
 */
export const getCartItemsCount = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(404).json({ message: "Please provide the user id" });
    }

    const cartItems = await Cart.find({ user: userId });

    return res.status(200).json({
      itemCount: cartItems.length,
      message: "Cart items count retieved successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/*
 * Empty the cart after the user purchases the products
 */
export const emptyTheCart = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(404).json({ message: "Please provide the user id" });
    }

    const cartItems = await Cart.find({ user: userId });

    // Update product quantities and delete cart items
    for (const cartItem of cartItems) {
      const { product, quantity } = cartItem;

      // Update product quantity
      await Product.findByIdAndUpdate(product, {
        $inc: { quantity: -quantity },
      });
    }

    const emptyTheCart = await Cart.deleteMany({ user: userId });

    const itemsEmptiedCount = emptyTheCart.deletedCount || 0;

    return res
      .status(200)
      .json({ itemsEmptiedCount, message: "Cart emptied successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
