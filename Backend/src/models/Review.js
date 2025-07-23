import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  review_text: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", reviewSchema);
export { Review };
