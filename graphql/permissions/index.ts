import { rule, allow, deny, or } from "nexus-plugin-shield";
import { getUserId } from "../utils/user";

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
    "*": isAdmin,
    me: allow,
    page: allow,
    pages: allow,
    blogPosts: allow,
    products: allow,
  },
  Mutations: {
    adminCreateOneBlogPost: isAdmin,
    login: allow,
    signup: allow,
    addToCart: isAuthenticated,
  },
};

export { rules };
