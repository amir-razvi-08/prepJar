import { z } from "zod";

export const createInterviewSchema = z.object({
  userId: z.string().min(1),
  jobPosition: z.string().min(2),
  jobDescription: z.string().min(10),
  typeOfInterview: z.enum(["Technical", "HR", "Behavioral"]),
  difficulty: z.enum(["Easy", "Medium", "Hard"])
});

export type CreateInterviewInput = z.infer<typeof createInterviewSchema>;
