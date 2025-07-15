import React, { useState } from "react";

export default function CommentForm({ postId, onCommentAdded }) {
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("You must be logged in to comment.");
      return;
    }

    try {
      setLoading(true);
      console.log("🧪 Token in use:", token);

      const res = await fetch(`/api/comments/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: commentText }),
      });

      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        throw new Error("Invalid JSON response: " + text);
      }

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit comment");
      }

      setCommentText("");
      if (onCommentAdded) onCommentAdded(data);
    } catch (error) {
      console.error("❌ Failed to submit comment:", error.message);
      alert("Failed to submit comment: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <textarea
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Write a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        {loading ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}
