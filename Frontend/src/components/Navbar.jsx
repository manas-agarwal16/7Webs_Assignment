import React, { useEffect, useState } from "react";
import Api from "../helper/axiosInstance.js";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        await Api.get("/auth/get-user");
        setIsUserLoggedIn(true);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setIsUserLoggedIn(false);
        }
      }
    };
    fetchLoggedInUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await Api.post("/auth/logout");
      setIsUserLoggedIn(false); // Fix: set logged out on success
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      setIsUserLoggedIn(false);
    }
  };

  return (
    <nav className="bg-[#1a2233] shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-2 mb-3">
        <div
          onClick={() => navigate("/")}
          className="text-3xl font-extrabold text-blue-500 cursor-pointer select-none hover:text-blue-400 transition"
          tabIndex={0}
          role="button"
          onKeyDown={(e) => {
            if (e.key === "Enter") navigate("/");
          }}
          aria-label="Navigate to Home"
        >
          Book Review Platform
        </div>

        <ul className="flex gap-6 items-center text-gray-300 select-none">
          <li>
            <Link
              to="/"
              className="hover:text-blue-400 focus:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 px-2 py-1 rounded transition"
            >
              Books
            </Link>
          </li>

          {isUserLoggedIn && (
            <li>
              <Link
                to="/add"
                className="hover:text-blue-400 focus:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 px-2 py-1 rounded transition"
              >
                Add Book
              </Link>
            </li>
          )}

          {!isUserLoggedIn && (
            <>
              <li>
                <Link
                  to="/login"
                  className="hover:text-blue-400 focus:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 px-2 py-1 rounded transition"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="hover:text-blue-400 focus:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 px-2 py-1 rounded transition"
                >
                  Signup
                </Link>
              </li>
            </>
          )}

          {isUserLoggedIn && (
            <li>
              <button
                onClick={handleLogout}
                className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg px-4 py-1 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                aria-label="Log out"
              >
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
