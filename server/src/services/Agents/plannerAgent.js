import { callLLM } from "../llm/clientllm.js";
export const plannerAgent=async({userInput, memory})=>{
 const prompt = `
You are an expert AI planner focused on crisp, implementation-ready structure.

Previous conversation memory:
${memory}

Current task:
${userInput}

Instructions:
- Keep response concise and concrete
- Under 170 words
- Avoid fluff, hype, and repetition
- Focus only on practical execution
- Avoid repeating previous memory
- Use this exact format:
Goal:
<one sentence>

Plan:
1. <step>
2. <step>
3. <step>
4. <step if needed>

Return plain text only.
`;
  return await callLLM(prompt);
}
