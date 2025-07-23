import express from "express";
import { CreateReview, GetReviewsForBook } from "../controllers/reviews.js";
import { verifyJWT } from "../middlewares/auth.js";

const router = express.Router();

router.post('/rate-book/:bookId', verifyJWT, CreateReview);
router.get('/book-reviews/:bookId', GetReviewsForBook);

export default router;