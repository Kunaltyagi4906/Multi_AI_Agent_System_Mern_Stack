export default function AgentCard({ title, emoji, content }) {
  return (
    <div className="bg-red-900 border border-gray-700  rounded-xl p-4 w-[600px] mb-4 shadow-lg hover:scale-[1.02] transition">
    
      <div className="flex items-center gap-2 mb-2">

        <span className="text-xl">{emoji}</span>
        <h2 className="font-semibold text-lg">{title}</h2>
      </div>

      <pre className="text-sm text-gray-300 whitespace-pre-wrap">
        {content}
      </pre>
    </div>
  );
}