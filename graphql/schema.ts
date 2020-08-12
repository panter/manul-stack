import { schema, use } from "nexus";
import { prisma } from "nexus-plugin-prisma";

import "./modules/user";
import { auth } from "nexus-plugin-jwt-auth";
import { APP_SECRET } from "./utils";

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
    t.crud.blogPosts();
  },
});

schema.mutationType({
  definition(t) {
    t.crud.createOneUser();
    t.crud.createOneBlogPost();
  },
});
