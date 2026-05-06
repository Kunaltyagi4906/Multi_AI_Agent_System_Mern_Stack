// import { useState } from "react";
// import axios from "axios";

// export default function ChatInput({ setMessages, setLoading, loading }) {
//   const [input, setInput] = useState(""); // ✅ define here

//   const sendMessage = async () => {
//     if (!input.trim() || loading) return;

//     setLoading(true);

//     setMessages(prev => [...prev, { role: "user", content: input }]);

//     try {
//       const res = await axios.post("http://localhost:5000/api/chat", {
//         message: input,
//       });

//       const data = res.data;

//       const agents = [
//         { name: "🤖 Planner", content: data.planner },
//         { name: "⚙️ Executor", content: data.executor },
//         { name: "💀 Critic", content: data.critic },
//         { name: "🧠 Final", content: data.final },
//       ];

//       for (let agent of agents) {
//         await new Promise(r => setTimeout(r, 800));

//         setMessages(prev => [
//           ...prev,
//           {
//             role: "agent",
//             agent: agent.name,
//             content: agent.content,
//           }
//         ]);
//       }

//     } catch (err) {
//       console.error(err);
//     }

//     setLoading(false);
//     setInput(""); // clear input
//   };

//   return (
//     <div className="flex gap-2 max-w-3xl mx-auto">
//       <input
//         value={input}
//         onChange={(e) => setInput(e.target.value)} // ✅ now works
//         placeholder="Ask your AI team..."
//         className="flex-1 bg-gray-800 px-4 py-2 rounded-lg outline-none"
//       />

//       <button
//         onClick={sendMessage}
//         disabled={loading}
//         className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
//       >
//         {loading ? "..." : "Send"}
//       </button>
//     </div>
//   );
// }