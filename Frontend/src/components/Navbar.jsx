import React from "react";
import Api from "../helper/axiosInstance.js";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        await Api.get("/auth/get-user");

        console.log("User is logged in.");

        setIsUserLoggedIn(true);
      } catch (error) {
        // user not logged in
        if (error.response && error.response.status === 401) {
          console.log("User not logged in or session expired.");
          setIsUserLoggedIn(false);
        }
      }
    };
    fetchLoggedInUser();
  }, []);

  const handleLogout = async () => {
    try {
      await Api.post("/auth/logout");
      setIsUserLoggedIn(true);
      navigate("/login");
    } catch (error) {
      setIsUserLoggedIn(false);
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-white shadow mb-8 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <span
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-blue-600 cursor-pointer"
          >
            BookReviews
          </span>
        </div>
        <ul className="flex gap-4 items-center">
          <li>
            <Link className="hover:text-blue-700" to="/">
              Books
            </Link>
          </li>
          {isUserLoggedIn && (
            <li>
              <Link className="hover:text-blue-700" to="/add">
                Add Book
              </Link>
            </li>
          )}
          {!isUserLoggedIn && (
            <li>
              <Link className="hover:text-blue-700" to="/login">
                Login
              </Link>
            </li>
          )}
          {!isUserLoggedIn && (
            <li>
              <Link className="hover:text-blue-700" to="/signup">
                Signup
              </Link>
            </li>
          )}
          {isUserLoggedIn && (
            <li>
              <button
                className="bg-blue-600 text-white rounded px-3 py-1"
                onClick={handleLogout}
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
