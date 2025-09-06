import { Router } from "express";
import upload from "../middlewares/fileUploadMiddleware.js";

const uploadFileRouter = Router();

uploadFileRouter
  //post
  .post("/upload", upload.single("file"), (req, res) => {
    console.log("request", req.file);
    res.status(200).json({ message: "File uploaded successfully!" });
  });

export default uploadFileRouter;
