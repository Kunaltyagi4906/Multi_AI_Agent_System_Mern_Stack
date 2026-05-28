import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import chat from "./routes/chat.js";
import { connectDB } from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", chat);

const startServer = async () => {
  try {
      console.log(process.env.MONGO_URI);
    await connectDB();

    app.listen(5000, () => {
      console.log("Server is running on port 5000 🚀");
    });

  } catch (error) {
    console.log(error);
  }
};
startServer();