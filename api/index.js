import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

import dbConfig from "./config/db.config.js";
import { errorHandler } from "./utils/errorHandler.js";

dotenv.config(); // Load environment variables

const app = express();

// ----------------- MIDDLEWARES -----------------
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// ----------------- DATABASE CONNECTION -----------------
const connectDB = async () => {
  try {
    await mongoose.connect(dbConfig.url); // Mongoose 7+ no options needed
    console.log("✅ Connected to MongoDB Atlas!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected");
});

// ----------------- ROUTES -----------------
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

// ----------------- ERROR HANDLER -----------------
app.use(errorHandler);

// ----------------- START SERVER -----------------
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Backend server is running on port ${PORT}`);
});
