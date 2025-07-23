import React from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import { BookOpenIcon } from "@heroicons/react/24/solid";

const BookCard = ({ book }) => (
  <div className="bg-gray-900 rounded-3xl shadow-lg p-6 flex flex-col justify-between text-gray-300 transition-shadow duration-300 ease-in-out hover:shadow-blue-600/75 hover:scale-[1.02]">
    <div>
      <div className="flex items-center gap-3 mb-3">
        <BookOpenIcon className="w-7 h-7 text-blue-400" />
        <h2 className="text-xl font-semibold truncate text-white">{book.title}</h2>
      </div>

      <p className="text-gray-400 mb-1 text-sm sm:text-base">
        by <span className="font-medium text-blue-300">{book.author}</span>
      </p>

      <p className="text-indigo-400 text-xs uppercase font-semibold tracking-wider mb-4">
        {book.genre}
      </p>

      <div className="flex items-center gap-2">
        <StarRating rating={Number(book.averageRating) || 0} dark />
        <span className="text-blue-300 font-semibold text-sm">
          {book.averageRating ? `${book.averageRating}/5` : "No ratings"}
        </span>
        {typeof book.reviewCount === "number" && (
          <span className="text-gray-500 text-xs ml-2 select-none">
            ({book.reviewCount} review{book.reviewCount !== 1 ? "s" : ""})
          </span>
        )}
      </div>
    </div>

    <Link
      to={`/books/${book._id}`}
      className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 text-white px-5 py-2 rounded-full font-semibold text-sm shadow-md transition"
      aria-label={`View details about ${book.title}`}
    >
      View Details
    </Link>
  </div>
);

export default BookCard;
