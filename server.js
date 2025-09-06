import express from "express";
import userRouter from "./routers/userRouter.js"
import authRouter from "./routers/authRouter.js";
import productRouter from "./routers/productRouter.js";
import cartRouter from "./routers/cartRouter.js";
import categoryRouter from "./routers/categoryRouter.js";
import uploadFileRouter from "./routers/uploadFileRouter.js";

import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./mongoDb/mongoDb.js";

// Load environment variables
dotenv.config();

const app = express();

// Built-in & third-party middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Route-level middleware
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/category", categoryRouter);
app.use("/api/file", uploadFileRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server after DB connection
const PORT = process.env.PORT;
(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1);
  }
})();
