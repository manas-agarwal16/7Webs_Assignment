import express from "express";
import { Book } from "../models/Book.js";
import { Review } from "../models/Review.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const router = express.Router();

// Add new book, post '/'
const AddBook = asyncHandler(async (req, res) => {
  const { title, author, genre } = req.body;
  if (!title || !author || !genre)
    return res
      .status(400)
      .json(new ApiResponse(400, null, "All fields required"));
  try {
    const book = new Book({ title, author, genre });
    await book.save();
    res.status(201).json(new ApiResponse(201, book, "Book added successfully"));
  } catch (err) {
    res.status(500).json(new ApiError(500, err.message));
  }
});

// Get books (with filters, sorting, pagination), get '/'
const GetBooks = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, genre, author, sortBy } = req.query;
  const filter = {};

  if (genre) {
    filter.genre = { $regex: genre, $options: "i" };
  }

  if (author) {
    filter.author = { $regex: author, $options: "i" };
  }

  let sortOptions = {};
  if (sortBy === "rating") sortOptions.averageRating = -1;
  else sortOptions.createdAt = -1;

  try {
    const books = await Book.find(filter)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    // Add average rating and review count to each book
    const booksWithRatings = await Promise.all(
      books.map(async (book) => {
        // Get reviews for the book
        const reviews = await Review.find({ book: book._id });

        // Cal. the average rating
        const totalRating = reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        );

        const averageRating = reviews.length
          ? (totalRating / reviews.length).toFixed(1)
          : null;

        // Return avg. rating and review count
        return {
          ...book._doc,
          averageRating,
          reviewCount: reviews.length,
        };
      })
    );

    if (booksWithRatings.length === 0) {
      return res
        .status(404)
        .json(new ApiError(404, "No books found matching the criteria"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, booksWithRatings, "Books fetched successfully")
      );
  } catch (err) {
    res.status(500).json(new ApiError(500, err.message));
  }
});

// Get book detail , get '/:id'
const GetBookDetails = asyncHandler(async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    // fetch reviews for the book
    const reviews = await Review.find({ book: book._id }).populate(
      "reviewer",
      "username"
    );

    // Calculate average rating
    const avg =
      reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          ...book._doc,
          averageRating: reviews.length ? avg.toFixed(1) : null,
          reviews,
        },
        "Book details fetched successfully"
      )
    );
  } catch (err) {
    res.status(500).json(new ApiError(500, err.message));
  }
});

export { AddBook, GetBooks, GetBookDetails };
