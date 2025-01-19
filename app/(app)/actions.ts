"use server";

import getSessionData from "@/lib/iron-session";
import { ApiError, serverActionWrapper } from "@/lib/server-action-helper";
import {
  CreatePostSchema,
  GetFeedSchema,
  GetPostsSchema,
  PostWithAuthor,
} from "@/types";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const createPost = serverActionWrapper({
  schema: CreatePostSchema,
  async callback(input) {
    const session = await getSessionData();
    const post = await prisma.post.create({
      data: { authorId: session.userId!, content: input.content },
    });
    return post;
  },
});

export const getFeed = serverActionWrapper({
  schema: GetFeedSchema,
  async callback() {
    const session = await getSessionData();
    const userFeed: PostWithAuthor[] = await prisma.post.findMany({
      // where: {
      // author: {
      // followers: {
      // some: { followerId: session.userId! },
      //     },
      //   },
      // },
      include: {
        author: {
          select: { name: true, avatarUrl: true, username: true },
        },
        _count: { select: { comments: true } },
        likes: { where: { userId: session.userId! }, select: { id: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return userFeed;
  },
});

export const likePost = serverActionWrapper({
  schema: z.string(),
  async callback(postId) {
    const session = await getSessionData();
    try {
      await prisma.post.update({
        where: { id: postId },
        data: {
          likes: { create: { userId: session.userId! } },
          numLikes: { increment: 1 },
        },
      });
    } catch (e) {
      throw new ApiError({
        status: 400,
        message: "You have already liked this post",
      });
    }
  },
});

export const getPost = serverActionWrapper({
  schema: z.string(),
  async callback(postId) {
    return await prisma.post.findFirst({ where: { id: postId } });
  },
});
