import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log(`MongoDB connected successfully`);
    // in this we r not writing app.on , app.listen . this file is only for database connection.
  } catch (error) {
    console.log("DB error", error);
    throw error;
  }
};

export default connectDB;