import { callLLM } from "../llm/clientllm.js";
export const plannerAgent=async({userInput, memory})=>{
 const prompt = `
You are an expert AI planner.

Previous conversation memory:
${memory}

Current task:
${userInput}

Instructions:
- Keep response concise
- Under 150 words
- Use bullet points
- Focus only on practical execution
- Avoid repeating previous memory

Create a step-by-step plan.
`;
  return await callLLM(prompt);
}