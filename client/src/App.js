import { useState } from "react";
import axios from "axios";
import MessageBubble from "./components/MessageBubble";
import "./App.css";
import { useEffect, useRef } from "react";
function App() {
  const bottomRef = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);
  const sendMessage = () => {
  if (!input.trim() || loading) return;

  setMessages((prev) => [
    ...prev,
    { role: "user", content: input },
  ]);

  setLoading(true);

  const eventSource = new EventSource(
    `http://localhost:5000/api/chat?message=${input}`
  );

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.done) {
      setLoading(false);
      eventSource.close();
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        role: data.role,
        content:
          data.role === "planner"
            ? `Here's the plan:\n${data.content}`
            : data.role === "executor"
            ? `Executing based on planner:\n${data.content}`
            : data.role === "critic"
            ? `I found some issues:\n${data.content}`
            : data.role === "final"
            ? `Here's the improved final plan:\n${data.content}`
            : data.content,
      },
    ]);
  };

  eventSource.onerror = () => {
    console.error("Streaming error");
    setLoading(false);
    eventSource.close();
  };

  setInput("");
};

  return (
    <div className="app">
      <div className="chat-container">

      <h2 className="title">
        Multi-Agent AI Chat
        <p>        This is a demo of a multi-agent AI system with a planner, executor, and critic. Enter a task and watch the agents collaborate in real-time!
</p>
        </h2>

        
      <div className="chat-box">
        {messages.map((msg, index) => (
          <MessageBubble
            key={index}
            role={msg.role}
            content={msg.content}
          />
        ))}


        {loading && <p>🤖 Agents thinking...</p>}
      </div>
      <div ref={bottomRef}></div>
      <div className="input-box">

   
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your task..."
          
        />


        <button onClick={sendMessage} disabled={loading}>
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  </div>
  );
}

export default App;