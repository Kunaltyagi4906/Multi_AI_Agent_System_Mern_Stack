// import { useState } from "react";
// import ChatInput from "../components/ChatInput";
// import ChatWindow from "../components/ChatWindow";

// export default function Home() {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      
//       <div className="flex-1 overflow-y-auto p-6">
//         <ChatWindow messages={messages} />
//       </div>

//       <div className="p-4 border-t border-gray-800">
//         <ChatInput
//           setMessages={setMessages}
//           setLoading={setLoading}
//           loading={loading}
//         />
//       </div>
//     </div>
//   );
// }