import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home.jsx";
import Login from "@/pages/Login.jsx";
import Register from "@/pages/Register.jsx";
import CreatePost from "@/pages/CreatePost.jsx";
import PostDetail from "@/pages/PostDetail.jsx";
import Navbar from "@/components/Navbar.jsx";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <Navbar />
        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
