"use server";

import { ApiError, serverActionWrapper } from "@/lib/server-action-helper";
import { createSecretKey } from "crypto";
import { prisma } from "@/lib/prisma";
import { compare, hash } from "@/lib/scrypt";
import { SigninSchema, SignupSchema } from "@/types";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import env from "@/env";
import { z } from "zod";

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
    // TODO: Set expiry for jwt and cookies
    const secretKey = createSecretKey(env.JWT_SECRET, "utf-8");
    const token = await new SignJWT()
      .setSubject(user.id)
      .setProtectedHeader({ alg: "HS256" })
      .sign(secretKey);
    (await cookies()).set("token", token);
  },
});

export const getUser = serverActionWrapper({
  schema: z.void(),
  async callback() {
    const NotAuthenticated = new ApiError({
      message: "Not authenticated",
      status: 401,
    });
    const token = (await cookies()).get("token");
    if (!token) throw NotAuthenticated;
    const secretKey = createSecretKey(env.JWT_SECRET, "utf-8");
    try {
      const { payload } = await jwtVerify(token.value, secretKey);
      const sub = payload.sub!;
      const user = await prisma.user.findUnique({ where: { id: sub } });
      if (!user) throw NotAuthenticated;
      return user;
    } catch (e) {
      throw NotAuthenticated;
    }
  },
});
