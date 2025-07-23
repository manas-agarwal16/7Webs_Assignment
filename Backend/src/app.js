import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// const allowedOrigins = process.env.CORS_ORIGIN.split(",");
const allowedOrigins = ["http://localhost:3000", process.env.CORS_ORIGIN];

//.use to configure middelware.
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

//route import
import authRouter from "./routes/auth.js";
import bookRouter from "./routes/books.js";
import reviewRouter from "./routes/reviews.js";

app.get("/", (req, res) => {
  res.status(200).send("Welcome 7Webs Team. This is the backend server for the Book Review App.");
});

app.use("/auth", authRouter);
app.use("/book", bookRouter);
app.use("/review", reviewRouter);

export { app };
