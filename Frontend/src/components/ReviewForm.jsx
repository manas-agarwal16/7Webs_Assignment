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
    <form className="my-6" onSubmit={handleSubmit}>
      <label className="block mb-2 font-semibold text-gray-800">
        Leave a Review
      </label>
      <textarea
        name="review_text"
        placeholder="Your review..."
        value={form.review_text}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 mb-2"
        rows={3}
        required
      />
      <div className="flex items-center gap-2 mb-2">
        <span className="font-bold text-gray-700">Rating:</span>
        <select
          name="rating"
          value={form.rating}
          onChange={handleChange}
          className="rounded border px-2 py-1"
        >
          {[5, 4, 3, 2, 1].map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        <StarRating rating={rating} />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold"
        type="submit"
      >
        Add Review
      </button>
      {message && (
        <div
          className={`mt-2 ${
            message === "Review added!" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
};

export default ReviewForm;
