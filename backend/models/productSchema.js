import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      maxLength: 100,
    },
    description: {
      type: String,
      maxLength: 1000,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: 0,
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
      min: 0,
    },
    category: {
      type: String,
      ref: "Category",
      required: [true, "Product category is required"],
    },
    image: {
      type: String,
      default: "",
    },
    favorites: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
