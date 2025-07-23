import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../helper/axiosInstance.js";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
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
    <div className="max-w-md mx-auto bg-white shadow rounded p-8 mt-10">
      <h2 className="text-2xl mb-4 font-bold text-blue-700">Login</h2>
      {error && <div className="text-red-600 mb-3">{error}</div>}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="rounded border-gray-300 px-4 py-2 shadow"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="rounded border-gray-300 px-4 py-2 shadow"
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 font-semibold">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
