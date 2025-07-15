// server/routes/postRoutes.js
import express from "express";
import {
  getAllPosts,
  createPost,
  deletePost,
  getPostById,
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// @route GET /api/posts
router.get("/", getAllPosts);

// @route GET /api/posts/:id
router.get("/:id", getPostById);

// @route POST /api/posts
router.post("/", protect, upload.single("image"), createPost);

// @route DELETE /api/posts/:id
router.delete("/:id", protect, deletePost);

export default router;
