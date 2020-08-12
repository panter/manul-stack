import { schema, use } from "nexus";
import { prisma } from "nexus-plugin-prisma";
import { booleanArg } from "nexus/components/schema";

use(
  prisma({
    features: {
      crud: true,
    },
  })
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
