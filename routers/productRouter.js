import { Router } from "express";
import {
  createProduct,
  fetchAllProducts,
  fetchProductById,
} from "../controllers/productController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/roleMiddleware.js";

const productRouter = Router();

productRouter
  //post
  .post("/create", authMiddleware, adminOnly, createProduct)
  .get("/getAll", authMiddleware, fetchAllProducts)
  .get("/delete/:id", authMiddleware, adminOnly, fetchProductById);

export default productRouter;
