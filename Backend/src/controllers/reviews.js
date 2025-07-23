import { Review } from "../models/Review.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Create a new review for a book, post '/:bookId'
const CreateReview = asyncHandler(async (req, res) => {
  // get review text and rating from request body
  const { review_text, rating } = req.body;

  // Validate review text and rating
  if (!review_text || !rating)
    return res
      .status(400)
      .json(new ApiError(400, "Review text and rating are required"));

  // Validate rating
  if (rating < 1 || rating > 5)
    return res
      .status(400)
      .json(new ApiError(400, "Rating must be between 1 and 5"));

  try {
    const reviewExists = await Review.findOne({
      book: req.params.bookId,
      reviewer: req.user._id,
    });

    if (reviewExists) {
      return res
        .status(400)
        .json(new ApiError(400, "You have already reviewed this book"));
    }

    const review = new Review({
      review_text,
      rating,
      reviewer: req.user._id,
      book: req.params.bookId,
    });
    await review.save();
    res
      .status(201)
      .json(new ApiResponse(201, review, "Review created successfully"));
  } catch (err) {
    res.status(500).json(new ApiError(500, err.message));
  }
});

// Get all reviews for a book, get '/:bookId'
const GetReviewsForBook = asyncHandler(async (req, res) => {
  try {
    // get bookId from request parameters
    const { bookId } = req.params;

    // Validate bookId
    if (!bookId) {
      return res
        .status(400)
        .json(new ApiError(400, "Book ID is required to fetch reviews"));
    }

    // Fetch reviews for the book
    const reviews = await Review.find({ book: bookId }).populate(
      "reviewer",
      "username"
    );

    // send response
    res
      .status(201)
      .json(new ApiResponse(201, reviews, "Reviews fetched successfully"));
  } catch (err) {
    res.status(500).json(new ApiError(500, err.message));
  }
});

export { CreateReview, GetReviewsForBook };
