import { callLLM } from "../llm/clientllm.js";

export const executorAgent = async ({ plan, critique = "", userInput }) => {
  const prompt = `
You are a startup execution expert.

Convert the plan into REAL ACTION.

IMPORTANT:
Think like a startup founder with LIMITED budget.

Focus on:
- MVP (minimum viable product)
- low-cost tools
- small team (1-3 people)
- quick launch (2-4 weeks)

Avoid:
- expensive infrastructure
- large hiring
- complex systems

ALWAYS use this exact format:
Execution:
Step 1:
- Action:
- How:
- Tools:
- Time:
- Cost:

Step 2:
- Action:
- How:
- Tools:
- Time:
- Cost:

Step 3:
- Action:
- How:
- Tools:
- Time:
- Cost:

Add Step 4 only if truly needed.
Do not turn the answer into paragraphs.
User Task:
${userInput}

Plan:
${plan}

${critique ? `Critic Feedback:\n${critique}` : ""}

If critique exists:
- Improve execution
- Fix weaknesses

Keep it practical, specific, and under 220 words.
`;

  return await callLLM(prompt);
};
