import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"; // ✅ Add this
import postRoutes from "./routes/postRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// ✅ Mount API routes
app.use("/api/auth", userRoutes); // This makes /api/auth/login work
app.use("/api/posts", postRoutes);

// ✅ Error handlers
app.use(notFound);
app.use(errorHandler);

// ✅ DB + Server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
