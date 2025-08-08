import { PromptTemplate } from "@langchain/core/prompts";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { QUESTIONS_PROMPT } from "../prompts/interviewQuesPrompt";
import { llm } from "../llm/geminiLLM";

const prompt = PromptTemplate.fromTemplate(QUESTIONS_PROMPT);

export const generateInterviewChain = RunnableSequence.from([prompt, llm, new JsonOutputParser()]);
