import User from "../models/userSchema.js";
import validator from "validator";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    if (!validator.isEmail(req.body["email"])) {
      res.status(400).json({ message: "Invalid email address" });
    }

    const checkUserExistence = await User.findOne({
      $or: [{ email: req.body["email"] }, { username: req.body["username"] }],
    });

    if (checkUserExistence) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = await User.create({
      username: req.body["username"],
      password: req.body["password"],
      email: req.body["email"],
      role: "c",
    });

    return res.status(201).json({ message: "Signed up successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.checkPassword(password, user.password))) {
      return res.json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.username, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "30m",
      }
    );
    return res
      .status(200)
      .json({ token, user, message: "Logged in successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const authenticate = async (req, res) => {
  const { id, name, role } = req.user;
  try {
    res.status(200).json({
      message: "User authenticated",
      user: {
        id,
        name,
        role,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
