import { MAX_POST_CONTENT } from "@/lib/constants";
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

export type SessionData = {
  userId?: string;
};

export const CreatePostSchema = z.object({
  content: z.string().max(MAX_POST_CONTENT),
});

export const GetPostsSchema = z.object({});
export type GetPostsSchema = z.infer<typeof GetPostsSchema>;

export type CreatePostSchema = z.infer<typeof CreatePostSchema>;

export const GetFeedSchema = z.object({});
export type GetFeedSchema = z.infer<typeof GetFeedSchema>;

export const PostCommentSchema = z.object({
  content: z.string(),
  postId: z.string(),
});
export type PostCommentSchema = z.infer<typeof PostCommentSchema>;

export * from "./database";
