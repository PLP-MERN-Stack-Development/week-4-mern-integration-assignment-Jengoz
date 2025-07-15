import express from "express";
import { createComment, getCommentsByPost } from "../controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all comments for a post
router.get("/:postId", getCommentsByPost);

// POST a new comment (protected)
router.post("/:postId", protect, createComment);

export default router;
