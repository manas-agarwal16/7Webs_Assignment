import React from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import { BookOpenIcon } from "@heroicons/react/24/solid";

const BookCard = ({ book }) => (
  <div className="bg-white rounded-lg shadow-md p-5 flex flex-col justify-between transition hover:shadow-xl">
    <div>
      <div className="flex items-center gap-2 mb-2">
        <BookOpenIcon className="w-6 h-6 text-blue-400" />
        <h2 className="text-lg font-bold">{book.title}</h2>
      </div>
      <p className="text-gray-600 mb-1">by <span className="font-semibold">{book.author}</span></p>
      <p className="text-gray-500 text-sm italic mb-2">Genre: {book.genre}</p>
      <div className="flex items-center gap-2">
        <StarRating rating={Number(book.averageRating) || 0} />
        <span className="text-gray-700 text-sm">
          {book.averageRating ? `${book.averageRating}/5` : "No ratings"}
        </span>
        {book.reviewCount !== undefined && (
          <span className="text-xs text-gray-400 ml-2">({book.reviewCount} reviews)</span>
        )}
      </div>
    </div>
    <Link to={`/books/${book._id}`} className="mt-4 inline-block text-blue-600 hover:underline font-medium">
      View Details
    </Link>
  </div>
);

export default BookCard;
