import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient<{ omit: { user: { password: true } } }>;
};

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ omit: { user: { password: true } } });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
