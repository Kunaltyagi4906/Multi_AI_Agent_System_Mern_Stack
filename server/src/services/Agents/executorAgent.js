import { callLLM } from "../llm/clientllm.js";

export const executorAgent = async ({ plan, critique = "", userInput }) => {
  const prompt = `
  ALWAYS keep step-by-step format.
  
  Do NOT convert into paragraphs or sections.
  
  Even after improvements:
  - Maintain Step 1, Step 2 format
  - Only improve existing steps or add new steps
  
  Never change structure.
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

FORMAT:

Step:
- Action:
- How:
- Tools:
- Time:
- Cost:
User Task:
${userInput}

Plan:
${plan}

${critique ? `Critic Feedback:\n${critique}` : ""}

If critique exists:
- Improve execution
- Fix weaknesses

Keep it practical and under 120 words.
`;

  return await callLLM(prompt);
};