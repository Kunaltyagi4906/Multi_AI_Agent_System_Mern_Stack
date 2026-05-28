import { useTypingEffect } from "../hooks/useTypingEffect";

const MessageBubble = ({ role, content }) => {
  const typedText = useTypingEffect(content);

  const isUser = role === "user";

  const getLabel = () => {
    if (role === "planner") return "🤖 Planner";
    if (role === "executor") return "⚙️ Executor";
    if (role === "critic") return "💀 Critic";
    if (role === "final") return "🧠 Final";
    if (role === "user") return "👤 You";
    return "📊 System";
  };
  const bubbleStyle = {
  padding: "10px 14px",
  borderRadius: "12px",
  margin: "6px 0",
  maxWidth: "80%",
  backdropFilter: "blur(10px)",
  background:
    role === "user"
      ? "linear-gradient(135deg, #6366f1, #4f46e5)"
      : "rgba(255,255,255,0.08)",
  alignSelf: role === "user" ? "flex-end" : "flex-start",
};

  const agentColors = {
    planner: "#22c55e",
    executor: "#3b82f6",
    critic: "#ef4444",
    final: "#a855f7",
  };

  return (
    

    

    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: "12px",
      }}
    >
      <div
        style={{
          background: isUser
            ? "#6366f1"
            : agentColors[role] || "#374151",
          color: "white",
          padding: "12px",
          borderRadius: "12px",
          maxWidth: "70%",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        {/* Label */}
        <div
          style={{
            fontSize: "12px",
            opacity: 0.7,
            marginBottom: "4px",
          }}
        >
          {getLabel()}
        </div>

        {/* Content */}
        <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.5" }}>
          {isUser ? content : typedText}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;