import React from "react";
import StarRating from "./StarRating";

const ReviewList = ({ reviews = [] }) => (
  <div className="mt-8">
    <h4 className="font-bold mb-2 text-blue-700">Reviews</h4>
    {reviews.length === 0 && <div>No reviews yet.</div>}
    <div className="flex flex-col gap-4">
      {reviews.map(r => (
        <div key={r._id} className="bg-gray-50 rounded p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-blue-600">{r.reviewer.username}</span>
            <StarRating rating={Number(r.rating) || 0} />
            <span className="text-gray-500">{r.rating}/5</span>
            <span className="ml-auto text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</span>
          </div>
          <div>{r.review_text}</div>
        </div>
      ))}
    </div>
  </div>
);

export default ReviewList;
