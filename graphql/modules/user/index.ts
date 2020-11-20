import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { APP_SECRET, getUserId, getHashedPassword } from "../../utils/user";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { extendType, objectType, stringArg } from "@nexus/schema";

const { ROOT_URL = "http://localhost:3000" } = process.env;

dayjs.extend(utc);

const setLoginHeader = (ctx, user) => {
  const token = sign({ userId: user.id }, APP_SECRET);

  const expires = dayjs().add(8, "week").utc();
  ctx.res.setHeader(
    "Set-Cookie",
    `token=${token}; Path=/; expires=${expires}; HttpOnly; Domain=${
      new URL(ROOT_URL).hostname
    }`
  );
};

const setLogoutHeader = (ctx) =>
  ctx.res.setHeader(
    "Set-Cookie",
    `token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Domain=${
      new URL(ROOT_URL).hostname
    }`
  );

export const UserRole = objectType({
  name: "UserRole",
  definition(t) {
    t.model.id();
    t.model.users();
  },
});

export const User = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.blogPosts();
    t.model.roles();
  },
});

export const Query = extendType({
  type: "Query",
  definition(t) {
    t.field("me", {
      type: "User",
      resolve(root, args, { prisma, user }) {
        if (!user) {
          return null;
        }
        return prisma.user.findOne({ where: { id: user.id } });
      },
    });
  },
});

export const Mutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("signup", {
      type: objectType({
        name: "SignupResult",
        definition(t) {
          t.field("user", {
            type: "User",
          });
        },
      }),
      args: {
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { email, password }, ctx) => {
        ctx.res;

        const user = await ctx.prisma.user.create({
          data: {
            email,
            password: await getHashedPassword(password),
          },
        });

        // for web login
        setLoginHeader(ctx, user);

        return {
          user,
        };
      },
    });

    t.field("login", {
      type: objectType({
        name: "LoginResult",
        definition(t) {
          t.field("user", {
            type: "User",
          });
        },
      }),
      args: {
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { email, password }, ctx) => {
        const user = await ctx.prisma.user.findOne({
          where: {
            email,
          },
        });
        if (!user) {
          throw new Error(`No user found for email: ${email}`);
        }
        const passwordValid = await compare(password, user.password);
        if (!passwordValid) {
          throw new Error("Invalid password");
        }
        setLoginHeader(ctx, user);

        return {
          user,
        };
      },
    });
    t.field("logout", {
      type: "Boolean",
      resolve(root, args, ctx) {
        setLogoutHeader(ctx);
        return true;
      },
    });
  },
});
