import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../helper/axiosInstance.js";

const AddBook = () => {
  const [form, setForm] = useState({ title: "", author: "", genre: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.genre) {
      setError("All fields are required.");
      return;
    }
    try {
      await API.post("/book/new-book", form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Error adding book.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[#1a2233] border border-[#23213a] p-8 rounded-3xl shadow-lg mt-16 text-gray-300">
      <h2 className="text-3xl mb-6 font-bold text-white text-center">
        Add New Book
      </h2>
      {error && (
        <div className="text-red-500 bg-red-900 bg-opacity-30 rounded px-4 py-2 mb-4 text-center font-semibold">
          {error}
        </div>
      )}
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="rounded-lg border border-[#393f63] bg-[#232842] px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          className="rounded-lg border border-[#393f63] bg-[#232842] px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          name="genre"
          placeholder="Genre"
          value={form.genre}
          onChange={handleChange}
          className="rounded-lg border border-[#393f63] bg-[#232842] px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white rounded-full py-3 text-lg font-semibold shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mt-2"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
