import { hash } from "bcryptjs";

export const APP_SECRET = process.env.APP_SECRET || "SOMESUPERSECRETKEY";

export const getUserId = (token: any | null | undefined) => {
  return token?.userId;
};

export const getHashedPassword = (password: string) => hash(password, 10);
