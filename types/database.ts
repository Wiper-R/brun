import { Post, User as _User } from "@prisma/client";

export type PostWithAuthor = {
  author: { name: string; username: string; avatarUrl: string | null };
  _count: { comments: number };
  likes: { id: string }[];
} & Post;
