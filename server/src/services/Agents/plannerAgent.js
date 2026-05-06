import { callLLM } from "../llm/clientllm.js";
export const plannerAgent=async(Input)=>{
  const  prompt=`You are a planner. Give ONLY 5 bullet points. Keep it short:
  Task:${Input}`;

  return await callLLM(prompt);
}