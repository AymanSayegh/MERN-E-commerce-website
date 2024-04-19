import mongoose from "mongoose";
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required for subscription"],
      unique: true,
      maxLength: 150,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Subscription", subscriptionSchema);
const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
