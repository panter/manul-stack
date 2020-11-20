import { allow, rule } from "graphql-shield";
import { Context } from "../types";

const isAuthenticated = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    return Boolean(ctx.user);
  }
);

const isAdmin = rule({ cache: "contextual" })(
  async (parent, args, ctx: Context, info) => {
    if (!ctx.user) {
      return null;
    }
    return ctx.prisma.user
      .findOne({ where: { id: ctx.user.id } })
      .roles({ where: { id: "admin" } })
      .then((r) => r.length > 0);
  }
);

export default {
  Query: {
    "*": isAdmin,
    me: allow,
    page: allow,
    pages: allow,
    blogPosts: allow,
  },
  Mutation: {
    login: allow,
    signup: allow,
  },
};
