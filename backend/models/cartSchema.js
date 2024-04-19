import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required for the cart"],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product ID is required for the cart item"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required for the cart item"],
      min: 1,
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Cart", cartSchema);
const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
