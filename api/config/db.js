import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // Try connecting to MongoDB Atlas
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Atlas connection failed: ${error.message}`);
    process.exit(1); // Optional: Exit process if DB connection fails
  }
};
