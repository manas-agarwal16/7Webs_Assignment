import express from "express";
import { AddBook, GetBookDetails, GetBooks } from "../controllers/books.js";
import { verifyJWT } from "../middlewares/auth.js";

const router = express.Router();

router.post('/new-book', verifyJWT, AddBook);
router.get('/get-books', GetBooks);
router.get('/book/:id', GetBookDetails);

export default router;
