import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { schema, settings } from "nexus";
import { APP_SECRET, getUserId, ROOT_URL } from "../../utils";
import { User } from "@prisma/client";
import { booleanArg, objectType } from "nexus/components/schema";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

settings.change({
  server: {
    playground: {
      settings: {
        "request.credentials": "include",
      },
    },
  },
});
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
  name: "User",
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.blogPosts();

    t.int("numberOfBlogPosts", {
      args: {
        includeUnpublished: booleanArg(),
      },
      resolve(user, { includeUnpublished }, context) {
        return context.db.blogPost.count({
          where: {
            ...(includeUnpublished ? {} : { published: true }),
            userId: {
              equals: user.id,
            },
          },
        });
      },
    });
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

    // export type FindManyUserArgs = {
    //   /**
    //    * Select specific fields to fetch from the User
    //   **/
    //   select?: UserSelect | null
    //   /**
    //    * Choose, which related nodes to fetch as well.
    //   **/
    //   include?: UserInclude | null
    //   /**
    //    * Filter, which Users to fetch.
    //   **/
    //   where?: UserWhereInput
    //   /**
    //    * Determine the order of the Users to fetch.
    //   **/
    //   orderBy?: Enumerable<UserOrderByInput>
    //   /**
    //    * Sets the position for listing Users.
    //   **/
    //   cursor?: UserWhereUniqueInput
    //   /**
    //    * The number of Users to fetch. If negative number, it will take Users before the `cursor`.
    //   **/
    //   take?: number
    //   /**
    //    * Skip the first `n` Users.
    //   **/
    //   skip?: number
    // }

    t.crud.user();
        t.crud.users({
          filtering: true,
          pagination: true,
          ordering: true,
        });
        t.int("usersCount", {
          args: {
            where: schema.arg({
              type: `UserWhereInput`,
              required: false,
            }),
            orderBy: schema.arg({
              type: `UserOrderByInput`,
              required: false,
            }),
            skip: schema.intArg({
              required: false,
            }),

            cursor: schema.arg({
              type: `UserWhereUniqueInput`,
              required: false,
            }),
            take: schema.intArg({
              required: false,
            }),
          },

          resolve(root, args, { db }) {
            return db.user.count(args);
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
        const hashedPassword = await hash(password, 10);
        const user = await ctx.db.user.create({
          data: {
            email,
            password: hashedPassword,
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
