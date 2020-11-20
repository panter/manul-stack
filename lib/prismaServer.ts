import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    errorFormat: "colorless",
    log: ["info"],
  });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      errorFormat: "colorless",
      log: ["info"],
    });
  }

  prisma = global.prisma;
}

export default prisma;
