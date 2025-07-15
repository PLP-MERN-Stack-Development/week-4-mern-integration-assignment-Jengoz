import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    setUser(null);
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/" className="text-xl font-bold text-blue-600">
          📝 MERN Blog
        </Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/create" className="text-blue-600 hover:underline">
                Create
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
              <Link to="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
