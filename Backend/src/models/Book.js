import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Book = mongoose.model("Book", bookSchema);
export { Book };
