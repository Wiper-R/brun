import { Comment, Post, User as _User } from "@prisma/client";

export type User = {
  name: string;
  username: string;
  avatarUrl: string | null;
};
export type PostWithAuthor = {
  author: User;
  _count: { comments: number };
  likes: { id: string }[];
} & Post;

export type CommentWithAuthor = {
  author: User;
} & Comment;
