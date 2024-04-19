import mongoose from "mongoose";
const Schema = mongoose.Schema;

const favoriteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required for the favorite"],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product ID is required for the favorite"],
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Favorite", favoriteSchema);
const Favorite = mongoose.model("Favorite", favoriteSchema);
export default Favorite;
