import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => {
        console.error("Error fetching post:", err);
        setError("Could not fetch post.");
      });
  }, [id]);

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  if (!post) {
    return <div className="text-center mt-10">Loading post...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-2">{post.title}</h2>
      <p className="text-sm text-gray-500 mb-4">
        Category: {post.category?.name || "Uncategorized"} |{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      {post.imageUrl && (
        <img
          src={`http://localhost:5000${post.imageUrl}`}
          alt="Post"
          className="w-full h-64 object-cover rounded mb-6"
        />
      )}
      <p className="text-gray-800">{post.body}</p>
    </div>
  );
}
