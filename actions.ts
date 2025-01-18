"use server";

import { ApiError, serverActionWrapper } from "@/lib/server-action-helper";
import { prisma } from "@/lib/prisma";
import { compare, hash } from "@/lib/scrypt";
import { SessionData, SigninSchema, SignupSchema } from "@/types";
import { cookies } from "next/headers";
import env from "@/env";
import { getIronSession } from "iron-session";
import { z } from "zod";
import getSessionData from "./lib/iron-session";

export const signup = serverActionWrapper({
  schema: SignupSchema,
  async callback({ email, password, name, username }) {
    const hashedPassword = await hash(password);
    try {
      await prisma.user.create({
        data: { email, name, username, password: hashedPassword },
      });
    } catch (e) {
      throw new ApiError({ message: "User already exists", status: 400 });
    }
  },
});

export const signin = serverActionWrapper({
  schema: SigninSchema,
  async callback({ username_email, password }) {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: username_email }, { username: username_email }],
      },
      select: { id: true, password: true },
    });
    const Invalid = new ApiError({
      message: "Invalid credentials",
      status: 400,
    });
    if (!user) {
      throw Invalid;
    }
    const valid = await compare(password, user.password);
    if (!valid) {
      throw Invalid;
    }
    const session = await getIronSession<SessionData>(await cookies(), {
      cookieName: "session",
      password: env.JWT_SECRET,
    });

    session.userId = user.id;
    await session.save();
  },
});

export const getUser = async () => {
  const session = await getIronSession<SessionData>(await cookies(), {
    cookieName: "session",
    password: env.JWT_SECRET,
  });
  if (!session.userId) return null;
  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  return user;
};

export const logout = serverActionWrapper({
  schema: z.void(),
  async callback() {
    const session = await getSessionData();
    session.destroy();
  },
});
