import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          throw new Error("Invalid response format from server.");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPosts();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-white shadow p-4 rounded hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-sm text-gray-600">{post.body.slice(0, 100)}...</p>
          <Link
            to={`/post/${post._id}`}
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Read more
          </Link>
        </div>
      ))}
    </div>
  );
}
