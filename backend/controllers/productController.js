import Product from "../models/productSchema.js";
import Subscription from "../models/subscriptionSchema.js";
import nodemailer from "nodemailer";

/**
 * Add a new product to the database
 */
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, quantity, category, imgUrl } = req.body;

    if (!name || !description || !price || !quantity || !category || !imgUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = await Product.create({
      name: name,
      description: description,
      price: price,
      quantity: quantity,
      category: category,
      image: imgUrl,
    });

    sendNewProductEmail(newProduct);

    return res.status(201).json({ message: "Product created successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**
 * Get all the products sorted depending on the customer choice
 */
export const getAllProductsSorted = async (req, res) => {
  try {
    const { selectedSort } = req.query;

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

    // Retrieve products based on the query and sorting option
    const products = await Product.find().sort(sortOption);

    return res
      .status(200)
      .json({ products, message: "Products retrieved successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**
 * Delete a product from the database
 */
export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**
 * Get a product by id
 */
export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res
      .status(200)
      .json({ product, message: "Product found successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**
 * Edit a product in the database
 */
export const editProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updatedProductDetails = req.body;

    if (!productId) {
      return res.status(400).json({ error: "Missing productId" });
    }

    if (!updatedProductDetails) {
      return res
        .status(400)
        .json({ error: "No product details provided for update" });
    }

    const productToEdit = await Product.findByIdAndUpdate(
      productId,
      //   {
      //   name: updatedProductDetails.name,
      //   description: updatedProductDetails.description,
      //   price: updatedProductDetails.price,
      //   quantity: updatedProductDetails.quantity,
      //   category: updatedProductDetails.category,
      //   image: updatedProductDetails.imgUrl,
      // }
      updatedProductDetails,
      { new: true }
    );

    if (!productToEdit) {
      return res
        .status(404)
        .json({ error: "Product not found or no changes made" });
    }

    return res.status(201).json({ message: "Product updated successfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

/**
 * Get the 12 most popular products based on favorites
 */
export const getPopularProducts = async (req, res) => {
  try {
    const popularProducts = await Product.find()
      .sort({ favorites: -1 }) //Sort by favorites in descending order
      .limit(12);

    if (!popularProducts) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json({
      products: popularProducts,
      message: "Popular products retrieved successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**
 * Get the products corresponding to a specific category
 */
export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryName, selectedSort } = req.query;

    if (!categoryName) {
      return res.status(404).json({ message: "Please send category name" });
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

    // Retrieve products based on the query and sorting option
    const products = await Product.find({ category: categoryName }).sort(
      sortOption
    );

    return res
      .status(200)
      .json({ products, message: "Products retrieved successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**
 * Search for a specific product
 */
export const searchProducts = async (req, res) => {
  try {
    const { populate, filters } = req.query;

    // Construct the search query based on the provided filters
    const searchQuery = {};

    // Check if the 'name' filter is provided
    if (filters && filters.name && filters.name.$contains) {
      // Use MongoDB's $regex operator for case-insensitive search
      searchQuery.name = {
        $regex: new RegExp(filters.name.$contains, "i"),
      };
    }

    // Perform the search using the constructed query
    let products = [];
    if (Object.keys(searchQuery).length === 0) {
      // If no filters provided, return all products
      products = await Product.find();
    } else {
      // If filters provided, perform the filtered search
      products = await Product.find(searchQuery);
    }

    // Populate specified fields if 'populate' parameter is provided
    if (populate) {
      products = await Product.populate(products, { path: populate });
    }

    return res.status(200).json({ products });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**
 * Send an email of the new added product to all the subscribed users
 */
const sendNewProductEmail = async (product) => {
  const subscriptions = await Subscription.find();
  const emails = subscriptions.map((subscription) => subscription.email);

  // Configure nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // Loop through each subscribed email and send the product notification
  for (const email of emails) {
    // Define email options
    const mailOptions = {
      from: "aymansayegh2002@hotmail.com",
      to: email,
      subject:
        "🚀 Exciting News: Discover the Latest Addition to ElectroStore!",
      html: `
        <p>Dear Subscriber,</p>

        <p>We hope this message finds you well! We're thrilled to share some exciting news with you. Drumroll, please...</p>

        <p>🌟 Introducing the Newest Addition: ${product.name}! 🌟</p>

        <p>Be the first to explore this cutting-edge product and elevate your ${product.category} experience. Here's a sneak peek of what awaits you:</p>

        <img src="${product.image}" alt="${product.name}" style="max-width: 100%; height: auto;">

        <p>🚀 Why You'll Love It: ${product.description}</p>

        <p>But wait, there's more! As a valued subscriber, you get exclusive early access to this incredible addition. Don't miss out—quantities are limited!</p>

        <p>Thank you for being a part of the ElectroStore community. We can't wait to hear what you think of our latest innovation.</p>

        <p>Best regards,<br>The ElectroStore Team</p>
      `,
    };

    // Send the email
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`Product notification email sent to ${email}`);
    } catch (error) {
      console.error(
        `Error sending product notification email to ${email}:`,
        error
      );
    }
  }
};
