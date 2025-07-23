import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../helper/axiosInstance.js";

const AddBook = () => {
  const [form, setForm] = useState({ title: "", author: "", genre: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
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
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow mt-10">
      <h2 className="text-xl mb-4 font-bold text-blue-600">Add New Book</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="rounded border-gray-300 px-4 py-2 shadow"
        />
        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          className="rounded border-gray-300 px-4 py-2 shadow"
        />
        <input
          name="genre"
          placeholder="Genre"
          value={form.genre}
          onChange={handleChange}
          className="rounded border-gray-300 px-4 py-2 shadow"
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 mt-2 font-semibold">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
