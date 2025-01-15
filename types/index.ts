import { z } from "zod";

export const SignupSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
});

export const SigninSchema = z.object({
  username_email: z.string(),
  password: z.string(),
});

export type SignupSchema = z.infer<typeof SignupSchema>;
export type SigninSchema = z.infer<typeof SigninSchema>;
