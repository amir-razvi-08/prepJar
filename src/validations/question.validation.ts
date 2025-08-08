import { z } from "zod";

export const createQuestionSchema = z.object({
  questionText: z.string().min(5),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  difficulty: z.enum(["Easy", "Medium", "Hard"]).optional()
});

export type QuestionInput = z.infer<typeof createQuestionSchema>;
