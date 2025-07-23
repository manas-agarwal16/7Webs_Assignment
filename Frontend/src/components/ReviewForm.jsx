import React, { useState, useEffect } from "react";
import API from "../helper/axiosInstance.js";
import StarRating from "./StarRating";

const ReviewForm = ({ bookId, onNewReview }) => {
  const [form, setForm] = useState({ review_text: "", rating: 5 });
  const [message, setMessage] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        await API.get("/auth/get-user");
        setIsUserLoggedIn(true);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setIsUserLoggedIn(false);
        }
      }
    };
    fetchLoggedInUser();
  }, [bookId]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isUserLoggedIn) {
      setMessage("You must be logged in to add a review.");
      return;
    }
    if (!form.review_text || !form.rating) {
      setMessage("Please provide review text and a rating.");
      return;
    }
    try {
      await API.post(`/review/review-book/${bookId}`, form);
      setForm({ review_text: "", rating: 5 });
      setMessage("Review added!");
      onNewReview();
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding review.");
    }
  };

  const rating = Number(form.rating);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1a2233] border border-[#23213a] rounded-3xl p-6 max-w-3xl mx-auto text-gray-300 shadow-lg transition-transform "
    >
      <label
        htmlFor="review_text"
        className="block mb-3 text-lg font-semibold text-white"
      >
        Leave a Review
      </label>
      <textarea
        id="review_text"
        name="review_text"
        placeholder="Write your review..."
        value={form.review_text}
        onChange={handleChange}
        rows={4}
        required
        className="w-full resize-none rounded-xl border border-[#393f63] bg-[#232842] px-4 py-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <div className="flex items-center gap-4 mt-4">
        <label
          htmlFor="rating"
          className="font-semibold text-gray-300 select-none"
        >
          Rating:
        </label>
        <select
          id="rating"
          name="rating"
          value={form.rating}
          onChange={handleChange}
          className="rounded-lg bg-[#232842] border border-[#393f63] px-3 py-1 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          {[5, 4, 3, 2, 1].map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        <StarRating rating={rating} dark />
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-semibold py-3 rounded-full shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Add Review
      </button>

      {message && (
        <p
          className={`mt-4 text-center font-medium ${
            message === "Review added!" ? "text-green-400" : "text-red-500"
          }`}
          role="alert"
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default ReviewForm;
