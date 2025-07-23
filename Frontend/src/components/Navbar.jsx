import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow mb-8 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <span onClick={() => navigate("/")} className="text-2xl font-bold text-blue-600 cursor-pointer">BookReviews</span>
        </div>
        <ul className="flex gap-4 items-center">
          <li><Link className="hover:text-blue-700" to="/">Books</Link></li>
          {token && <li><Link className="hover:text-blue-700" to="/add">Add Book</Link></li>}
          {!token && <li><Link className="hover:text-blue-700" to="/login">Login</Link></li>}
          {!token && <li><Link className="hover:text-blue-700" to="/signup">Signup</Link></li>}
          {token && (
            <li>
              <button className="bg-blue-600 text-white rounded px-3 py-1" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
