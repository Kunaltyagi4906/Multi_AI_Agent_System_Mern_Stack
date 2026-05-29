import { useEffect, useRef, useState } from "react";
import axios from "axios";
import MessageBubble from "./components/MessageBubble";
import "./App.css";

const API_BASE_URL = "http://localhost:5000/api";

const roleIntro = {
  planner: "Strategy outline",
  executor: "Execution blueprint",
  critic: "Quality review",
  final: "Refined final response",
};

const createHistoryMessages = (chat) => [
  { role: "user", content: chat.userInput },
  { role: "planner", content: chat.planner },
  { role: "executor", content: chat.executor },
  { role: "critic", content: chat.critic },
  { role: "final", content: chat.final },
  {
    role: "meta",
    content: `Saved run\nScore: ${chat.score}/10\nRounds: ${chat.rounds}`,
  },
];

const withRoleIntro = (role, content) => {
  if (!roleIntro[role]) {
    return content;
  }

  return `${roleIntro[role]}\n${"-".repeat(roleIntro[role].length)}\n${content}`;
};

function App() {
  const bottomRef = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const latestRun = history[0];
  const historyCount = history.length;

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/history`);
      setHistory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openChat = (chat) => {
    setMessages(createHistoryMessages(chat));
  };

  const sendMessage = () => {
    const trimmedInput = input.trim();

    if (!trimmedInput || loading) {
      return;
    }

    setMessages((prev) => [...prev, { role: "user", content: trimmedInput }]);
    setLoading(true);

    const eventSource = new EventSource(
      `${API_BASE_URL}/chat?message=${encodeURIComponent(trimmedInput)}`
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.done) {
        fetchHistory();
        setLoading(false);
        eventSource.close();
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: data.role,
          content: withRoleIntro(data.role, data.content),
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

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-panel">
          <p className="eyebrow">Workspace</p>
          <h1 className="sidebar-title">Multi-Agent Studio</h1>
          <p className="sidebar-copy">
            Plan, execute, critique, and refine each prompt through a sharper
            four-agent flow.
          </p>
        </div>

        <div className="sidebar-panel stats-grid">
          <div className="stat-card">
            <span className="stat-label">Saved Chats</span>
            <strong className="stat-value">{historyCount}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Latest Score</span>
            <strong className="stat-value">
              {latestRun ? `${latestRun.score}/10` : "--"}
            </strong>
          </div>
        </div>

        <div className="sidebar-panel">
          <div className="section-heading">
            <h2>History</h2>
            <span>{historyCount} runs</span>
          </div>

          <div className="history-list">
            {history.length === 0 ? (
              <div className="history-empty">
                Your previous runs will appear here.
              </div>
            ) : (
              history.map((chat) => (
                <button
                  key={chat._id}
                  type="button"
                  className="history-item"
                  onClick={() => openChat(chat)}
                >
                  <span className="history-title">{chat.userInput}</span>
                  <span className="history-meta">
                    Score {chat.score}/10 • {chat.rounds} round
                    {chat.rounds === 1 ? "" : "s"}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      </aside>

      <main className="chat-stage">
        <section className="hero-card">
          <div>
            <p className="eyebrow">Live Session</p>
            <h2>Advanced agent collaboration with clearer output structure</h2>
            <p className="hero-copy">
              Each message is streamed step by step so you can inspect planning,
              execution, critique, and the final improved answer as they happen.
            </p>
          </div>

          <div className="hero-badges">
            <span className="hero-badge">Planner</span>
            <span className="hero-badge">Executor</span>
            <span className="hero-badge">Critic</span>
            <span className="hero-badge">Final</span>
          </div>
        </section>

        <section className="chat-container">
          <div className="chat-header">
            <div>
              <p className="eyebrow">Conversation</p>
              <h3>Agent Console</h3>
            </div>
            <div className={`status-pill ${loading ? "busy" : "idle"}`}>
              {loading ? "Agents working" : "Ready"}
            </div>
          </div>

          <div className="chat-box">
            {messages.length === 0 ? (
              <div className="empty-state">
                <h4>Start with a real task</h4>
                <p>
                  Try something like “Build an MVP launch plan for a student
                  productivity app under a tight budget.”
                </p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <MessageBubble
                  key={`${msg.role}-${index}`}
                  role={msg.role}
                  content={msg.content}
                />
              ))
            )}

            {loading && (
              <div className="thinking-card">
                <span className="thinking-dot" />
                <span>Streaming agent responses...</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="input-box">
            <div className="input-shell">
              <label className="input-label" htmlFor="task-input">
                Task prompt
              </label>
              <input
                id="task-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                placeholder="Describe the project, problem, or idea you want the agents to work on..."
              />
            </div>

            <button
              type="button"
              className="send-button"
              onClick={sendMessage}
              disabled={loading}
            >
              {loading ? "Processing..." : "Run Agents"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
