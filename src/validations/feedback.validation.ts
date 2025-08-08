import { z } from "zod";

export const createFeedbackSchema = z.object({
  interviewId: z.string().min(1),
  userId: z.string().min(1),
  scores: z.object({
    technicalSkill: z.number().min(0).max(10),
    communicationSkill: z.number().min(0).max(10),
    problemSolvingSkill: z.number().min(0).max(10),
    experience: z.number().min(0).max(10)
  }),
  overallScore: z.number().min(0).max(100).optional(),
  strengths: z.array(z.string()).optional(),
  improvements: z.array(z.string()).optional(),
  summaryComment: z.string().optional()
});

export type FeedbackInput = z.infer<typeof createFeedbackSchema>;
