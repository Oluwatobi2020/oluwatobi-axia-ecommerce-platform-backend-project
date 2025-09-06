import { Router } from "express";
import {
  createCategory,
  fetchAllCategories,
} from "../controllers/categoryController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/roleMiddleware.js";

const categoryRouter = Router();

categoryRouter

  .post("/create", authMiddleware, adminOnly, createCategory)
  .get("/getAll", authMiddleware, fetchAllCategories);

export default categoryRouter;
