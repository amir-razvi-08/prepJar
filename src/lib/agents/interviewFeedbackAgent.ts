import { PromptTemplate } from "@langchain/core/prompts";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { FEEDBACK_PROMPT } from "../prompts/interviedFeedbackPrompt";
import { llm } from "../llm/geminiLLM";

const prompt = PromptTemplate.fromTemplate(FEEDBACK_PROMPT);

export const generateFeedbackChain = RunnableSequence.from([prompt, llm, new JsonOutputParser()]);
