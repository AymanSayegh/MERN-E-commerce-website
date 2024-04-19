import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      maxLength: 50,
      minLength: 2,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: 8,
      maxLength: 20,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      maxLength: 150,
      unique: true,
      lowercase: true,
    },
    role: {
      type: String,
      required: [true, "role is required"],
      maxLength: 1,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    // if the password field is not modified
    if (!this.isModified("password")) {
      return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
  } catch (err) {
    console.log(err);
  }
});

userSchema.methods.checkPassword = async function (
  candidatePassword, // coming from the frontend
  userPassword // coming from the DB
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
export default User;
