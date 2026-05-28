import { plannerAgent } from "../agents/plannerAgent.js";
import { executorAgent } from "../agents/executorAgent.js";
import { criticAgent } from "../agents/criticAgent.js";
import { finalAgent } from "../agents/finalAgent.js";
import Chat from "../../models/chatModel.js";
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const extractScore = (text) => {
  const m = text.match(/score\s*:\s*(\d+)/i);
  return m ? parseInt(m[1]) : 0;
};
   
export const runAgents = async (userInput) => {
  const plan = await plannerAgent(userInput);
  await sleep(1200);

  let execution = await executorAgent({ plan, userInput });
  await sleep(1200);

  let critique = await criticAgent(execution);
  let score = extractScore(critique);

  let round = 0;
  const MAX_ROUNDS = 2;   // keep it cheap + fast

  while (score < 9 && round < MAX_ROUNDS) {
    await sleep(1200);

    execution = await executorAgent({
      plan,
      critique,
      userInput
    });

    await sleep(1200);

    critique = await criticAgent(execution);
    score = extractScore(critique);

    round++;
  }
  const final = await finalAgent({
    userInput,
    plan,
    execution,
    critique,
  });

  await Chat.create({
  userInput,
  planner: plan,
  executor: execution,
  critic: critique,
  final,
  score,
  rounds: round,
});

return {
  planner: plan,
  executor: execution,
  critic: critique,
  final,
  score,
  rounds: round,
};
};