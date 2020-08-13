import { rule, allow, deny, or } from "nexus-plugin-shield";
import { getUserId } from "../utils";

const isAuthenticated = rule({ cache: "contextual" })(
  async (parent, args, ctx: NexusContext, info) => {
    const userId = getUserId(ctx.token);
    return Boolean(userId);
  }
);

const isAdmin = rule({ cache: "contextual" })(
  async (parent, args, ctx: NexusContext, info) => {
    const userId = getUserId(ctx.token);
    const user = await ctx.db.user.findOne({
      where: {
        id: userId,
      },
      include: {
        roles: true,
      },
    });
    return user?.roles.some((r) => r.id === "admin") ?? false;
  }
);

const rules = {
  Query: {
    "*": deny,
    me: allow,

    blogPosts: isAdmin,
    blogPostsPublic: allow,
  },
  Mutations: {
    "*": isAdmin,
    login: allow,
    signup: allow,
  },
};

export { rules };