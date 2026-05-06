import dotenv from 'dotenv';
dotenv.config();    
import express from 'express';
import cors from 'cors';
// cors are
import chat from './routes/chat.js';

const app=express();

app.use(cors());
app.use(express.json());

app.use("/api", chat);
console.log("GROQ KEY 👉", process.env.GROQ_API_KEY);
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
