import { schema } from "nexus";

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
          info,
        );
      },
    });
  },
});
