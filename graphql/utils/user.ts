import { hash } from "bcryptjs";

export const ROOT_URL = process.env.ROOT_URL || "http://localhost:3000";
export const APP_SECRET = process.env.APP_SECRET || "SOMESUPERSECRETKEY";

export const getUserId = (token: any | null | undefined) => {
  return token?.userId;
};

export const getHashedPassword = (password: string) => hash(password, 10);
