import axios from "axios";

export const callLLM = async (prompt) => {
  try {
    const res = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "You are a helpful AI agent." },
          { role: "user", content: prompt }
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    return res.data.choices[0].message.content;
  } catch (err) {
    console.error("Groq Error:", err.response?.data || err.message);
    throw err;
  }
};