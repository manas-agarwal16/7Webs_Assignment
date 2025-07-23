import express from "express";
import { SignIn, SignUp, GetUser, Logout } from "../controllers/auth.js";
import { verifyJWT } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.get("/get-user", GetUser);
router.post("/logout", verifyJWT, Logout);

export default router;
