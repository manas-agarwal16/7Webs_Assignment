import React, { useState, useEffect } from "react";
import API from "../helper/axiosInstance.js";
import BookCard from "../components/BookCard";
import BookFilters from "../components/BookFilters";
import Pagination from "../components/Pagination";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({
    author: "",
    genre: "",
    sortBy: "date",
  });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await API.get("/book/get-books", {
        params: { ...filters, page, limit: 6 },
      });

      console.log("Fetched books:", res);
      
      setBooks(res.data.data);
      setTotal(
        res.data.length < 6 ? (page - 1) * 6 + res.data.length : page * 6 + 1
      );
    };
    fetchBooks();
  }, [filters, page]);

  return (
    <div className="container mx-auto px-4">
      <BookFilters filters={filters} setFilters={setFilters} />
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {books.length === 0 ? (
          <div className="col-span-3 text-center py-8 text-gray-500">
            No books found.
          </div>
        ) : (
          books.map((book) => <BookCard key={book._id} book={book} />)
        )}
      </div>
      <Pagination page={page} setPage={setPage} hasNext={books.length === 6} />
    </div>
  );
};

export default BookList;
