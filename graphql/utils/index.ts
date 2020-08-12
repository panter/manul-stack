export const ROOT_URL = process.env.ROOT_URL || "http://localhost:3000";
export const APP_SECRET = "SOMESUPERSECRETKEY";

export const getUserId = (token: any | null | undefined) => {
  return token?.userId;
};
