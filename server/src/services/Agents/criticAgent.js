import { callLLM } from "../llm/clientllm.js";

export const criticAgent = async (execution) => {
  const prompt = `
You are a strict reviewer.

Return ONLY:
Score: <0-10>
Weaknesses:
- (max 2 bullets)
Improvements:
- (max 2 bullets)
Revision Priority:
- <single most important fix>

Be specific, concise, and blunt.

Execution:
${execution.slice(0, 800)}
`;
  return await callLLM(prompt);
};
