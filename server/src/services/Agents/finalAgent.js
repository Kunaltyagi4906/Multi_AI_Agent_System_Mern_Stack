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

Use this exact format:
Final Blueprint:
Objective:
<one sentence>

Execution Plan:
Step 1:
- What:
- Why:
- Deliverable:

Step 2:
- What:
- Why:
- Deliverable:

Step 3:
- What:
- Why:
- Deliverable:

Resources:
- Tools:
- Team:
- Budget:

Success Check:
- <one measurable outcome>

Keep it clean, practical, and easy to follow. Return plain text only.

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
