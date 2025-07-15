import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../lib/api";

export default function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Fetch all categories
    api
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => setError(err.response?.data?.message || err.message));

    // If editing, fetch the existing post
    if (isEditMode) {
      api
        .get(`/posts/${id}`)
        .then((res) => {
          setTitle(res.data.title);
          setBody(res.data.body);
          setCategory(res.data.category || "");
        })
        .catch((err) =>
          setError(err.response?.data?.message || err.message)
        );
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const payload = { title, body, category };

    try {
      if (isEditMode) {
        await api.put(`/posts/${id}`, payload);
      } else {
        await api.post("/posts", payload);
      }

      setSuccess(true);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">
        {isEditMode ? "Edit Post" : "Create a New Post"}
      </h2>

      {error && <p className="text-red-500 mb-2">Error: {error}</p>}
      {success && (
        <p className="text-green-600 mb-2">
          ✅ {isEditMode ? "Post updated!" : "Post created!"}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Body</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            rows="5"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEditMode ? "Update Post" : "Create Post"}
        </button>
      </form>
    </div>
  );
}
