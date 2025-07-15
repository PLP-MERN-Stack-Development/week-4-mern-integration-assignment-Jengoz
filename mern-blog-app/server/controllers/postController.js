import Post from "../models/postModel.js";
import Category from "../models/Category.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("category")
      .populate("user", "email")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("category")
      .populate("user", "email");

    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  const { title, body, category } = req.body;

  if (!title || !body || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let imageUrl = "";
  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`;
  }

  try {
    const newPost = new Post({
      title,
      body,
      category,
      imageUrl,
      user: req.user._id,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
