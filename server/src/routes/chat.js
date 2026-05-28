import express from "express";

import { handleChat, getChats } from "../controllers/chatController.js";
const router = express.Router();
router.get("/chat", handleChat);
router.get("/history", getChats);

export default router;