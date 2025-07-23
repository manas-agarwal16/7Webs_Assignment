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
    const res = await API.get(`/book/book/${id}`);

    setBook(res.data.data);
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  if (!book)
    return (
      <div className="text-center py-16 text-blue-700">Loading book...</div>
    );

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
      <div className="flex items-center text-gray-700 mb-2 gap-2">
        <span>
          by <span className="font-semibold">{book.author}</span>
        </span>
        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-500 rounded">
          {book.genre}
        </span>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <StarRating rating={Number(book.averageRating) || 0} />
        <span className="text-gray-700">
          {book.averageRating ? `${book.averageRating}/5` : "No ratings yet"}
        </span>
      </div>
      <ReviewForm bookId={id} onNewReview={fetchBook} />
      <ReviewList reviews={book.reviews || []} />
    </div>
  );
};

export default BookDetail;
