import { plannerAgent } from "../services/Agents/plannerAgent.js";
import { executorAgent } from "../services/Agents/executorAgent.js";
import { criticAgent } from "../services/Agents/criticAgent.js";
import { finalAgent } from "../services/Agents/finalAgent.js";

export const handleChat = async (req, res) => {
  const { message } = req.query; // 👈 CHANGE (not body)

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    // 🤖 Planner
    const plan = await plannerAgent(message);
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

    res.write(`data: ${JSON.stringify({
      role: "final",
      content: final,
    })}\n\n`);

    // ✅ done signal
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();

  } catch (error) {
    console.error("Streaming error:", error);
    res.end();
  }
};