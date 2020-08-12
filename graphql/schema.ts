import { schema, use, settings } from "nexus";
import { prisma } from "nexus-plugin-prisma";
import { shield } from "nexus-plugin-shield";
import "./modules/user";
import { auth } from "nexus-plugin-jwt-auth";
import { APP_SECRET } from "./utils";
import { rules } from "./permissions";

settings.change({
  server: {
    playground: {
      settings: {
        "request.credentials": "include",
      },
    },
  },
});

use(
  auth({
    appSecret: APP_SECRET,
    useCookie: true,
    cookieName: "token",
  })
);
use(
  prisma({
    features: {
      crud: true,
    },
  })
);

use(
  shield({
    rules,
  })
);

schema.objectType({
  name: "BlogPost",
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.description();
    t.model.user();
    t.model.published();
  },
});

schema.queryType({
  definition(t) {
    t.crud.users();
    t.crud.blogPosts({ filtering: true, alias: "adminBlogPosts" });
    t.crud.blogPosts({
      filtering: true,
      alias: "blogPostsPublic",
      resolve(root, { where, ...args }, ctx, info, originalResolve) {
        return originalResolve(
          root,
          {
            where: {
              ...where,
              published: {
                equals: true,
              },
            },
            ...args,
          },
          ctx,
          info
        );
      },
    });
  },
});

schema.mutationType({
  definition(t) {
    t.crud.createOneUser();
    t.crud.createOneBlogPost();
  },
});
