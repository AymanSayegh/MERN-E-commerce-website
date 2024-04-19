import userRoutes from "./routes/userRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";
import favoriteRoutes from "./routes/favoriteRoute.js";
import subscriptionRoutes from "./routes/subscriptionRoute.js";
import cartRoutes from "./routes/cartRoute.js";
import { connectDB } from "./database.js";
import cors from "cors";
import express from "express";
import { admin, categories, products } from "./data/index.js";
import User from "./models/userSchema.js";
import Product from "./models/productSchema.js";
import Category from "./models/categorySchema.js";

const app = express();
const port = process.env.PORT || 3002;

connectDB();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

/* ROUTES */
app.use("/users", userRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/favorite", favoriteRoutes);
app.use("/subscription", subscriptionRoutes);
app.use("/cart", cartRoutes);

/* ADD DATA ONE TIME */
// User.create(admin);
// Category.create(categories);
// Product.create(products);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
