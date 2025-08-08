import { z } from "zod";

export const createUserSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  avatar: z.string().url().optional(),
  googleId:z.string().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
