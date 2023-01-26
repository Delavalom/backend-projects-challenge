import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.string()
});

export type UserSchema = z.infer<typeof userSchema>;
