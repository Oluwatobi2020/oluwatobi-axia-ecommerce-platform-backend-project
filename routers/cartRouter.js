import Router from "express";
import {
  createCartItem,
  deleteCartItem,
  getCartItems,
  updateCartItem,
} from "../controllers/cartController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const cartRouter = Router();

cartRouter
  //create cart
  .post("/create/:id", authMiddleware, createCartItem)
  .put("/update", authMiddleware, updateCartItem)
  .get("/get-cart-item", authMiddleware, getCartItems)
  .delete("/delete-cart", authMiddleware, deleteCartItem);

export default cartRouter;
