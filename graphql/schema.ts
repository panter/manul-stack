import { schema, use, settings } from "nexus";

import { prisma } from "nexus-plugin-prisma";
import { shield } from "nexus-plugin-shield";
import { auth } from "nexus-plugin-jwt-auth";
import "./modules/user";
import "./modules/files";
import { nexusAddCrudResolvers } from "@ra-data-prisma/backend";
import { APP_SECRET } from "./utils";
import { rules } from "./permissions";

nexusAddCrudResolvers(
  schema,
  {
    User: {},
    BlogPost: {},
  },
  {
    aliasPrefix: "admin",
  }
);
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
    paginationStrategy: "prisma",
    features: {
      crud: true,
    },
  })
);

use(
  shield({
    rules,
    options: {
      allowExternalErrors: true,
    },
  })
);

schema.objectType({
  name: "BlogPost",
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.author();
    t.model.published();
    t.field("content", {
      type: "Json",
      resolve: (c) => (c.content ? JSON.parse(c.content) : null), // unfortunatly, sqlite has no json support
    });
  },
});

schema.queryType({
  definition(t) {
    t.crud.blogPosts({
      filtering: true,

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
