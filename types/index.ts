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
  content: z.string().min(1).max(MAX_POST_CONTENT),
});
export type CreatePostSchema = z.infer<typeof CreatePostSchema>;

export const GetPostsType = z.enum(["feed", "saved", "liked"]).default("feed");
export type GetPostsType = z.infer<typeof GetPostsType>;

export const GetPostsSchema = z.object({
  type: GetPostsType,
});
export type GetPostsSchema = z.infer<typeof GetPostsSchema>;

export const GetUserPostsSchema = z.string();

export type GetUserPostsSchema = z.infer<typeof GetUserPostsSchema>;

export const GetPostSchema = z.object({});
export type GetPostSchema = z.infer<typeof GetPostSchema>;

export const PostCommentSchema = z.object({
  content: z.string(),
  postId: z.string(),
});
export type PostCommentSchema = z.infer<typeof PostCommentSchema>;

export const GetFollowersSchema = z.object({ search: z.string().optional() });
export type GetFollowersSchema = z.infer<typeof GetFollowersSchema>;

export const SearchUsersSchema = z.object({ search: z.string().optional() });
export type SearchUsersSchema = z.infer<typeof SearchUsersSchema>;

export const GetCommentsSchema = z.object({
  username: z.string().nullable().default(null),
});
export type GetCommentsSchema = z.infer<typeof GetCommentsSchema>;

export const UpdateUserSchema = z.object({
  name: z.string().optional(),
  username: z.string().optional(),
});
export type UpdateUserSchema = z.infer<typeof UpdateUserSchema>;

export * from "./database";
