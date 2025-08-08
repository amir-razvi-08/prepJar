import { z } from "zod";

export const AnswerSchema = z.object({
  interviewId: z.string().min(1),
  questionId: z.string().min(1),
  userId: z.string().min(1),
  responseText: z.string().min(5),
  aiScore: z.number().min(0).max(100).optional(),
  aiFeedback: z.string().optional()
});

export type AnswerInput = z.infer<typeof AnswerSchema>;
