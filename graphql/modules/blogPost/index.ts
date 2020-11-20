import { objectType, queryType, scalarType } from "@nexus/schema";

export const JSONScalar = scalarType({
  name: "Json",
  serialize: (data: any) => JSON.parse(data),
  parseValue: (data: any) => JSON.stringify(data),
  asNexusMethod: "json",
});

export const BlogPost = objectType({
  name: "BlogPost",
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.author();
    t.model.published();
    t.field("content", {
      type: "Json",
      resolve: (c: any) => (c.content ? JSON.parse(c.content) : null),
    });
  },
});

export const QueryType = queryType({
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
