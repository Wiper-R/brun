"use server";

import getSessionData from "@/lib/iron-session";
import { ApiError, serverActionWrapper } from "@/lib/server-action-helper";
import {
  CommentWithAuthor,
  CreatePostSchema,
  GetFollowersSchema,
  GetPostsSchema,
  PostWithAuthor,
} from "@/types";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { Prisma } from "@prisma/client";

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

export const getPosts = serverActionWrapper({
  schema: GetPostsSchema,

  async callback(input) {
    const session = await getSessionData();
    let where: Prisma.PostWhereInput = {};
    console.log("Input is", input.type);
    if (input.type == "feed") {
      where = {
        author: {
          OR: [
            { followers: { some: { followerId: session.userId! } } },
            { id: session.userId! },
          ],
        },
      };
    } else if (input.type == "saved") {
      where = {
        savedPost: { some: { userId: session.userId! } },
      };
    }

    const userFeed: PostWithAuthor[] = await prisma.post.findMany({
      where,
      include: {
        author: {
          select: { name: true, avatarUrl: true, username: true },
        },
        _count: { select: { comments: true } },
        likes: { where: { userId: session.userId! }, select: { id: true } },
        savedPost: { select: { id: true } },
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
    const session = await getSessionData();
    const post: PostWithAuthor | null = await prisma.post.findFirst({
      where: { id: postId },
      include: {
        author: { select: { name: true, avatarUrl: true, username: true } },
        _count: { select: { comments: true } },
        likes: { where: { userId: session.userId! }, select: { id: true } },
        savedPost: { select: { id: true } },
      },
    });
    return post;
  },
});

export const getProfile = serverActionWrapper({
  schema: z.string(),
  async callback(username) {
    try {
      return await prisma.user.findUnique({
        where: { username },
        include: { _count: { select: { followers: true, following: true } } },
      });
    } catch (e) {
      throw new ApiError({ status: 404, message: "User not found" });
    }
  },
});

export const getComments = serverActionWrapper({
  schema: z.string(),
  async callback(postId) {
    const comments: CommentWithAuthor[] = await prisma.comment.findMany({
      where: { postId },
      include: {
        author: { select: { avatarUrl: true, username: true, name: true } },
      },
    });

    return comments;
  },
});

export const savePost = serverActionWrapper({
  schema: z.string(),
  async callback(postId) {
    const session = await getSessionData();
    await prisma.savedPost.create({
      data: { postId, userId: session.userId! },
    });
  },
});

export const getFollowers = serverActionWrapper({
  schema: GetFollowersSchema,
  async callback({ search }) {
    const session = await getSessionData();
    let cond: Prisma.FollowWhereInput = {};
    if (search) {
      cond = {
        follower: {
          OR: [
            { username: { contains: search, mode: "insensitive" } },
            { name: { contains: search, mode: "insensitive" } },
          ],
        },
      };
    }
    const result = await prisma.follow.findMany({
      where: {
        followeeId: session.userId,
        ...cond,
      },
      include: { follower: true },
    });

    return result.map((row) => row.follower);
  },
});

export const getUsers = serverActionWrapper({
  schema: GetFollowersSchema,
  async callback({ search }) {
    let cond: Prisma.UserWhereInput = {};
    if (search) {
      cond = {
        OR: [
          { username: { contains: search, mode: "insensitive" } },
          { name: { contains: search, mode: "insensitive" } },
        ],
      };
    }
    const result = await prisma.user.findMany({
      where: { ...cond },
    });

    return result;
  },
});
