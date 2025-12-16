// config/db.config.js
import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  url: process.env.MONGO_URL,
  // no options needed for Mongoose 7+
};

export default dbConfig;
