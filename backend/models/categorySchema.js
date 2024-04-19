import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      maxLength: 100,
    },
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Category", categorySchema);
const Category = mongoose.model("Category", categorySchema);
export default Category;
