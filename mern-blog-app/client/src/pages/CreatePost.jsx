import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    category: "",
    image: null,
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to fetch categories", err));
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title || !formData.body || !formData.category) {
      return setError("All fields are required.");
    }

    const form = new FormData();
    form.append("title", formData.title);
    form.append("body", formData.body);
    form.append("category", formData.category);
    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      await axios.post("http://localhost:5000/api/posts", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch (err) {
      console.error("Post creation failed:", err);
      setError("Post creation failed.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create Post</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="w-full border rounded px-3 py-2"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Body</label>
          <textarea
            name="body"
            className="w-full border rounded px-3 py-2"
            value={formData.body}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Category</label>
          <select
            name="category"
            className="w-full border rounded px-3 py-2"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="w-full"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
}
