import express from "express";
import multer from "multer";
import path from "path";
import { sendMessage, getMessages } from "../controllers/message.controller.js";

const router = express.Router();

// Setup multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.post("/sendMessage", upload.single("media"), sendMessage);
router.get("/getMessages", getMessages);

export default router;
