import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import protect from "../middleware/authMiddleware.js";
import path from "path";

const router = express.Router();

// POST /api/upload — requires auth
router.post("/", protect, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Respond with path for frontend use
  res.status(201).json({ imageUrl: `/uploads/${req.file.filename}` });
});

export default router;
