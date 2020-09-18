import { rule, allow } from "nexus-plugin-shield";
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
    if (!userId) {
      return false;
    }
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
  },
  Mutation: {
    "*": isAdmin,
    signup: allow,
    login: allow,
    logout: allow,
  },
  User: {
    id: allow,
    email: isAuthenticated,
    roles: isAdmin,
    blogPosts: isAuthenticated,
  },
  UserRole: {
    id: isAuthenticated,
    users: isAdmin,
  },
  BlogPost: {
    id: allow,
    title: allow,
    content: allow,
    author: allow,
    authorId: allow,
    published: isAdmin,
  },
  Page: {
    id: allow,
    published: isAdmin,
    createdAt: isAdmin,
    path: allow,
    slug: allow,
    sortKey: isAdmin,
    parentPageId: isAdmin,
    parentPage: isAdmin,
    childPages: isAdmin,
    navigationTitle: allow,
    navigationTitle_en: isAdmin,
    navigationTitle_de: isAdmin,
    htmlTitle: allow,
    htmlTitle_en: isAdmin,
    htmlTitle_de: isAdmin,
    content: allow,

    meta_description: allow,
    meta_description_en: isAdmin,
    meta_description_de: isAdmin,

    social_description: allow,
    social_description_en: isAdmin,
    social_description_de: isAdmin,

    social_title: allow,
    social_title_en: isAdmin,
    social_title_de: isAdmin,
  },
  LoginResult: {
    user: allow,
  },
};

export { rules };
