import Category from "../models/categorySchema.js";

/**
 * Retrieve all categories from the database.
 */
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    if (!categories) {
      return res.status(404).json({ message: "No categories found" });
    }

    return res
      .status(200)
      .json({ categories, message: "Categories returned successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**
 * Add a new category to the database.
 */
export const addCategory = async (req, res) => {
  try {
    const { name, imgUrl } = req.body;

    if (!name || !imgUrl) {
      return res.status(400).json({ message: "Name and image are required" });
    }

    const newCategory = await Category.create({
      name: name,
      image: imgUrl,
    });

    return res.status(201).json({ message: "Category created successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
