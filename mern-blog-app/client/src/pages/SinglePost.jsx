import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../lib/api";

export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => {
        setError(err.response?.data?.message || err.message);
      });
  }, [id]);

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!post) return <p className="text-gray-500">Loading post...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        Category: {post.category?.name || "Uncategorized"}
      </p>
      <p className="text-gray-800">{post.body}</p>
    </div>
  );
}
