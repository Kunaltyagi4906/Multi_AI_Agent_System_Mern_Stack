import { plannerAgent } from "../services/Agents/plannerAgent.js";
import { executorAgent } from "../services/Agents/executorAgent.js";
import { criticAgent } from "../services/Agents/criticAgent.js";
import { finalAgent } from "../services/Agents/finalAgent.js";
import Chat from "../models/chatModel.js";
export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find().sort({ createdAt: -1 });

    res.json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to fetch chats",
    });
  }
};

export const handleChat = async (req, res) => {
  const { message } = req.query;

  // 🧠 Memory
  const previousChats = await Chat.find()
    .sort({ createdAt: -1 })
    .limit(3);

  const memory = previousChats

        .map(chat => chat.userInput)
  .join(", ");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {

    // 🤖 Planner
    const plan = await plannerAgent({
      userInput: message,
      memory,
    });

    res.write(`data: ${JSON.stringify({
      role: "planner",
      content: plan,
    })}\n\n`);

    // ⚙️ Executor
    const execution = await executorAgent({
      plan,
      userInput: message,
    });

    res.write(`data: ${JSON.stringify({
      role: "executor",
      content: execution,
    })}\n\n`);

    // 💀 Critic
    const critique = await criticAgent(execution);

    res.write(`data: ${JSON.stringify({
      role: "critic",
      content: critique,
    })}\n\n`);

    // 🧠 Final
    const final = await finalAgent({
      userInput: message,
      plan,
      execution,
      critique,
    });

    // 💾 Save Chat
    await Chat.create({
      userInput: message,
      planner: plan,
      executor: execution,
      critic: critique,
      final,
      score: 8,
      rounds: 1,
    });

    res.write(`data: ${JSON.stringify({
      role: "final",
      content: final,
    })}\n\n`);

    // ✅ Done
    res.write(`data: ${JSON.stringify({
      done: true,
    })}\n\n`);

    res.end();

  } catch (error) {
    console.error("Streaming error:", error);
    res.end();
  }
};