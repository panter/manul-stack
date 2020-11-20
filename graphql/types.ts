import { PrismaClient, User } from "@prisma/client";

export type Context = {
  user?: User;
  prisma: PrismaClient;
  res: any;
  lang: string;
};
