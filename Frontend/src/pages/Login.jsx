import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../helper/axiosInstance.js";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("All fields are required.");
      return;
    }
    try {
      const res = await API.post("/auth/signin", form);
      localStorage.setItem("token", res.data.token);
      setError("");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[#1a2233] border border-[#23213a] rounded-3xl p-8 mt-16 shadow-lg text-gray-300">
      <h2 className="text-3xl font-bold mb-6 text-white text-center">Login</h2>
      {error && (
        <div className="text-red-500 bg-red-900 bg-opacity-30 rounded px-4 py-2 mb-4 text-center font-semibold">
          {error}
        </div>
      )}
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="rounded-lg border border-[#393f63] bg-[#232842] px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          autoComplete="username"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="rounded-lg border border-[#393f63] bg-[#232842] px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          autoComplete="current-password"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white rounded-full py-3 text-lg font-semibold shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
