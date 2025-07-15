import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";

export const createComment = async (req, res) => {
  try {
    console.log("🔐 User from token:", req.user);
    console.log("📨 Request body:", req.body);

    const { text } = req.body;
    const { postId } = req.params;

    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = new Comment({
      text,
      user: req.user._id,
      post: postId,
    });

    await comment.save();

    console.log("✅ Comment created:", comment);

    res.status(201).json(comment);
  } catch (error) {
    console.error("❌ Error creating comment:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate("user", "name email") // Optional: to get user info
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    console.error("❌ Error fetching comments:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
