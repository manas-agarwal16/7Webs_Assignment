import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized Request");
    }

    // Decode the token
    const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    if (!decodedToken) {
      return res
        .status(401)
        .json(new ApiResponse(401, "", "Error decoding access token"));
    }

    // Fetch user
    const user = await User.findOne({ _id: decodedToken._id }).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res
        .status(401)
        .json(
          new ApiResponse(401, "", "Unauthorized Request - User not found")
        );
    }

    req.user = user; // Attach user to request
    next(); // Proceed to next middleware
  } catch (error) {
    console.log("error here : ", error);

    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json(new ApiResponse(401, "", "Token expired. Please log in again."));
    }
    return res
      .status(401)
      .json(new ApiResponse(401, "", "Unauthorized Request"));
  }
});

export { verifyJWT };
