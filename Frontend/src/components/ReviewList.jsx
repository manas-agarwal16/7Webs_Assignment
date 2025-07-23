import React from "react";
import StarRating from "./StarRating";

const ReviewList = ({ reviews = [] }) => (
  <div className="mt-8 max-w-3xl mx-auto">
    <h4 className="font-extrabold mb-4 text-indigo-400 uppercase tracking-wide text-lg">
      Reviews
    </h4>

    {reviews.length === 0 && (
      <p className="text-center text-gray-500 italic select-none">
        No reviews yet.
      </p>
    )}

    <div className="flex flex-col gap-5">
      {reviews.map((r) => (
        <div
          key={r._id}
          className="bg-[#232842] border border-[#2d335a] rounded-2xl p-5 shadow-sm hover:shadow-indigo-700 transition-shadow"
        >
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="font-semibold text-indigo-400 select-text">
              {r.reviewer.username}
            </span>

            <StarRating rating={Number(r.rating) || 0} dark />

            <span className="text-indigo-300 font-medium select-none">
              {r.rating}/5
            </span>

            <span className="ml-auto text-xs text-indigo-500 select-none">
              {new Date(r.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <p className="text-gray-300 whitespace-pre-wrap">{r.review_text}</p>
        </div>
      ))}
    </div>
  </div>
);

export default ReviewList;
