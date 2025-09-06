import { Router } from "express";
import { getAllUser, createUser, updateAUser, deleteAUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/roleMiddleware.js";

const userRouter = Router()
  .post("/create-user", createUser)
  .get("/get-all-user", getAllUser)
  .put("/update-user/:userId", authMiddleware, updateAUser)
  .delete("/delete-user/:userId", authMiddleware, adminOnly, deleteAUser);

export default userRouter
