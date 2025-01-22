"use server";

import getSessionData from "@/lib/iron-session";
import { ApiError, serverActionWrapper } from "@/lib/server-action-helper";
import {
  CommentWithAuthor,
  CreatePostSchema,
  GetCommentsSchema,
  GetFollowersSchema,
  GetPostsSchema,
  GetUserPostsSchema,
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

async function _getPosts(where: Prisma.PostWhereInput) {
  const session = await getSessionData();
  const posts: PostWithAuthor[] = await prisma.post.findMany({
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
  return posts;
}

export const getUserPosts = serverActionWrapper({
  schema: GetUserPostsSchema,
  async callback(username) {
    return await _getPosts({ author: { username } });
  },
});

export const getPosts = serverActionWrapper({
  schema: GetPostsSchema,

  async callback(input) {
    const session = await getSessionData();
    let where: Prisma.PostWhereInput = {};
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
    } else if (input.type == "liked") {
      where = {
        likes: { some: { userId: session.userId! } },
      };
    }
    return await _getPosts(where);
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
    const { userId } = await getSessionData();
    try {
      const user = await prisma.user.findUnique({
        where: { username },
        include: { _count: { select: { followers: true, following: true } } },
      });
      if (!user) {
        throw new ApiError({ status: 404, message: "User not found" });
      }
      const following = await prisma.follow.findFirst({
        where: { followeeId: user.id, followerId: userId },
      });

      return { ...user, isFollowing: Boolean(following) };
    } catch (e) {
      throw new ApiError({ status: 404, message: "User not found" });
    }
  },
});

export const getPostComments = serverActionWrapper({
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
    const followersWithStatus = await Promise.all(
      result.map(async (row) => {
        const isFollowing = await prisma.follow.findFirst({
          where: {
            followeeId: row.followerId,
            followerId: session.userId,
          },
        });

        return {
          ...row.follower,
          isFollowing: Boolean(isFollowing),
        };
      }),
    );

    return followersWithStatus;
  },
});

export const getUsers = serverActionWrapper({
  schema: GetFollowersSchema,
  async callback({ search }) {
    const session = await getSessionData();
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
      where: { ...cond, NOT: { id: session.userId! } },
    });
    const userWithFollowing = await Promise.all(
      result.map(async (row) => {
        const isFollowing = await prisma.follow.findFirst({
          where: {
            followeeId: row.id,
            followerId: session.userId,
          },
        });

        return {
          ...row,
          isFollowing: Boolean(isFollowing),
        };
      }),
    );

    return userWithFollowing;
  },
});

export const getComments = serverActionWrapper({
  schema: GetCommentsSchema,
  async callback({ username }) {
    let cond: Prisma.CommentWhereInput = {};
    const session = await getSessionData();
    if (username) {
      cond = { author: { username } };
    } else {
      cond = { authorId: session.userId! };
    }

    const result = await prisma.comment.findMany({
      where: cond,
      orderBy: { createdAt: "desc" },
      select: {
        content: true,
        createdAt: true,
        id: true,
        authorId: true,
        post: {
          select: {
            id: true,
            author: { select: { avatarUrl: true, username: true, name: true } },
            content: true,
          },
        },
      },
    });

    return result;
  },
});

export const unfollow = serverActionWrapper({
  schema: z.string(),
  async callback(username) {
    const session = await getSessionData();
    const result = await prisma.follow.deleteMany({
      where: { followerId: session.userId!, followee: { username } },
    });
    console.log(result);
  },
});
