import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

// Signup
const SignUp = asyncHandler(async (req, res) => {
  try {
    // access username and password from request body
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
      return res
        .status(400)
        .json(new ApiError(400, "Username and password are required"));
    }

    // Check if user already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json(new ApiError(400, "User already exists"));
    }

    // Create new user
    user = new User({ username, password });
    await user.save();

    return res
      .status(201)
      .json(new ApiResponse(201, { username: user.username, id: user._id }));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
});

// Signin
const SignIn = asyncHandler(async (req, res) => {
  try {
    // access username and password from request body
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
      return res
        .status(400)
        .json(new ApiResponse(400, "", "username and password are required"));
    }

    // Check if user exists
    let user = await User.findOne({ username });

    // If user does not exist, return error
    if (!user) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, "", "Username or password is not registered yet")
        );
    }

    // Check if password is correct
    const validPassword = await user.isCorrectPassword(password);
    if (!validPassword) {
      return res
        .status(400)
        .json(new ApiResponse(400, "", "Wrong password! Try again"));
    }

    // Generate access and refresh tokens
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    if (!accessToken) {
      return res
        .status(500)
        .json(new ApiResponse(500, "", "Error in creating access token"));
    }
    if (!refreshToken) {
      return res
        .status(500)
        .json(new ApiResponse(500, "", "Error in creating refresh token"));
    }

    // Set refresh token in the database
    const setRefreshToken = await User.findOneAndUpdate(
      {
        $or: [{ username: username }],
      },
      { refreshToken: refreshToken }
    );

    if (!setRefreshToken) {
      return res
        .status(501)
        .json(new ApiResponse(501, "", "Error in updating refresh token"));
    }

    const options = {
      sameSite: "None",
      httpOnly: true,
      secure: true,
      maxAge: 60 * 24 * 60 * 1000, // 60 days
    };

    const userObj = user.toObject();
    userObj.password = null;
    userObj.refreshToken = null;

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(201, userObj, "User has logged in successfully"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
});

const Logout = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const updateRefreshToken = await User.findByIdAndUpdate(
    { _id: _id },
    { refreshToken: undefined },
    {
      new: true,
    }
  );

  if (!updateRefreshToken) {
    return res
      .status(501)
      .json(new ApiResponse(501, "", "Error in updating refresh token"));
  }

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
      new ApiResponse(
        201,
        { username: req.user.username },
        `${req.user.username} has logged out successfully`
      )
    );
});

const GetUser = asyncHandler(async (req, res) => {
  let user;
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json(
          new ApiResponse(
            401,
            { loginStatus: false, userData: {} },
            "Unauthorized request!!"
          )
        );
    }

    const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

    if (!decodedToken) {
      return res
        .status(501)
        .json(new ApiResponse(501, "", "error in decoding token"));
    }

    user = await User.findOne({ username: decodedToken.username }).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res
        .status(401)
        .json(
          new ApiResponse(
            401,
            { loginStatus: false, userData: {} },
            "Unauthorized request!!"
          )
        );
    }

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { loginStatus: true, userData: user },
          "Current user details fetched successfully"
        )
      );
  } catch (error) {
    return res
      .status(401)
      .json(
        new ApiResponse(
          401,
          { loginStatus: false, userData: {} },
          "invalid access token"
        )
      );
  }
});

export { SignUp, SignIn, GetUser, Logout };
