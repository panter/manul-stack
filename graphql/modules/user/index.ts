import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { schema } from "nexus";
import { APP_SECRET, getUserId, getHashedPassword } from "../../utils/user";
import { User } from "@prisma/client";
import { booleanArg, objectType } from "nexus/components/schema";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

const { ROOT_URL = "http://localhost:3000" } = process.env;

dayjs.extend(utc);

const setLoginHeader = (ctx: NexusContext, user: User) => {
  const token = sign({ userId: user.id }, APP_SECRET);

  const expires = dayjs().add(8, "week").utc();
  ctx.res.setHeader(
    "Set-Cookie",
    `token=${token}; Path=/; expires=${expires}; HttpOnly; Domain=${
      new URL(ROOT_URL).hostname
    }`
  );
};

const setLogoutHeader = (ctx: NexusContext) =>
  ctx.res.setHeader(
    "Set-Cookie",
    `token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Domain=${
      new URL(ROOT_URL).hostname
    }`
  );

schema.objectType({
  name: "UserRole",
  definition(t) {
    t.model.id();
  },
});
schema.objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.blogPosts();
    t.model.roles();
  },
});

schema.extendType({
  type: "Query",
  definition(t) {
    t.field("me", {
      type: "User",
      resolve(root, args, context) {
        const userId = getUserId(context.token);
        if (!userId) {
          return null;
        }
        return context.db.user.findOne({ where: { id: userId } });
      },
    });
  },
});

schema.extendType({
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
        email: schema.stringArg({ nullable: false }),
        password: schema.stringArg({ nullable: false }),
      },
      resolve: async (_parent, { email, password }, ctx) => {
        ctx.res;

        const user = await ctx.db.user.create({
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
        email: schema.stringArg({ nullable: false }),
        password: schema.stringArg({ nullable: false }),
      },
      resolve: async (_parent, { email, password }, ctx) => {
        const user = await ctx.db.user.findOne({
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
