import { callLLM } from "../llm/clientllm.js";

export const finalAgent = async ({ userInput, plan, execution, critique }) => {
  const prompt = `
You are a senior AI strategist.

Your job is to produce the FINAL BEST answer.

You are given:
- User request
- Initial plan
- Execution steps
- Critic feedback

Your task:
- Combine everything into a clear, practical final plan
- Keep it structured
- Keep step-by-step execution
- Include improvements suggested by critic
- Make it realistic (MVP approach)

FORMAT:

Final Plan:

Step 1:
Step 2:
Step 3:
...

Keep it clean, practical, and easy to follow.

User Request:
${userInput}

Plan:
${plan}

Execution:
${execution}

Critic:
${critique}
`;

  return await callLLM(prompt);
};