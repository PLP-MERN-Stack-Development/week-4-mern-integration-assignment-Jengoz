import express from "express";
import { getProfile, getAllUsers } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", protect, getProfile);
router.get("/", protect, getAllUsers); // Optional: list all users

export default router;
