import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../helper/axiosInstance.js";
import StarRating from "../components/StarRating";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  const fetchBook = async () => {
    try {
      const res = await API.get(`/book/book/${id}`);
      setBook(res.data.data);
    } catch {
      setBook(null);
    }
  };

  useEffect(() => {
    fetchBook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!book)
    return (
      <div className="flex justify-center items-center py-20 text-blue-400 text-lg font-semibold">
        Loading book...
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-[#1a2233] border border-[#23213a] rounded-3xl p-8 shadow-lg text-gray-300">
      <h2 className="text-3xl font-bold mb-4 text-white truncate">{book.title}</h2>

      <div className="flex flex-wrap items-center gap-3 mb-4 text-blue-300 text-sm">
        <span>
          by <span className="font-semibold text-blue-200">{book.author}</span>
        </span>
        <span className="px-3 py-1 text-xs uppercase font-semibold bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 rounded-full tracking-wider select-none">
          {book.genre}
        </span>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <StarRating rating={Number(book.averageRating) || 0} dark />
        <span className="text-blue-300 text-lg font-medium select-none">
          {book.averageRating ? `${book.averageRating}/5` : "No ratings yet"}
        </span>
      </div>

      <ReviewForm bookId={id} onNewReview={fetchBook} />

      <ReviewList reviews={book.reviews || []} />
    </div>
  );
};

export default BookDetail;
