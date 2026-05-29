import { useTypingEffect } from "../hooks/useTypingEffect";

const roleMeta = {
  planner: {
    label: "Planner",
    tone: "tone-planner",
    accent: "Strategy Agent",
  },
  executor: {
    label: "Executor",
    tone: "tone-executor",
    accent: "Execution Agent",
  },
  critic: {
    label: "Critic",
    tone: "tone-critic",
    accent: "Review Agent",
  },
  final: {
    label: "Final",
    tone: "tone-final",
    accent: "Synthesis Agent",
  },
  user: {
    label: "You",
    tone: "tone-user",
    accent: "Prompt",
  },
  meta: {
    label: "Run Data",
    tone: "tone-meta",
    accent: "Saved Session",
  },
};

const MessageBubble = ({ role, content }) => {
  const typedText = useTypingEffect(content);
  const isUser = role === "user";
  const meta = roleMeta[role] || {
    label: "System",
    tone: "tone-meta",
    accent: "System Message",
  };

  return (
    <div className={`message-row ${isUser ? "user-row" : "agent-row"}`}>
      <article className={`message-card ${meta.tone}`}>
        <div className="message-topline">
          <span className="message-label">{meta.label}</span>
          <span className="message-accent">{meta.accent}</span>
        </div>

        <div className="message-content">
          {isUser ? content : typedText}
        </div>
      </article>
    </div>
  );
};

export default MessageBubble;
