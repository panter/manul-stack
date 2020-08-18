import { nexusAddCrudResolvers } from "@ra-data-prisma/backend";
import { schema } from "nexus";

const makePath = (parentPath: string | null | undefined, slug: string) => {
  // special case: slug "/" is the root page
  if (slug === "/") {
    if (parentPath) {
      throw new Error("root page cant have a parent");
    }
    return "/";
  }
  if (!parentPath || parentPath === "/") {
    return `/${slug}`;
  }
  return `${parentPath}/${slug}`;
};
const updateAllChildPaths = async (
  ctx: NexusContext,
  parentId: string,
  parentPath: string
) => {
  const childPages = await ctx.db.page.findMany({
    where: {
      parentPageId: parentId,
    },
  });

  await Promise.all(
    childPages.map(async (child) => {
      const childPath = makePath(parentPath, child.slug);
      await ctx.db.page.update({
        where: {
          id: child.id,
        },
        data: {
          path: childPath,
        },
      });
      await updateAllChildPaths(ctx, child.id, childPath);
    })
  );
};
nexusAddCrudResolvers(
  schema,
  {
    User: {},
    UserRole: {},
    BlogPost: {},
    Product: {},
    ProductTag: {},
    // we need to customize pages, so that path is always auto-generated
    // needs https://github.com/graphql-nexus/nexus-plugin-prisma/pull/795
    Page: {
      customize: {
        createOne: (d) => ({
          ...d,
          computedInputs: {
            path: async ({
              ctx,
              args: { data },
            }: {
              ctx: NexusContext;
              args: any;
            }) => {
              const parentPage = data.parentPage?.connect
                ? await ctx.db.page.findOne({
                    where: data.parentPage.connect,
                  })
                : null;

              return makePath(parentPage?.path, data.slug);
            },
          },
        }),
        updateOne: (d) => ({
          ...d,
          computedInputs: {
            path: async ({
              ctx,
              args: { where, data },
            }: {
              ctx: NexusContext;
              args: any;
            }) => {
              const page = ctx.db.page.findOne({ where });

              const parentPage = data.parentPage?.connect
                ? await ctx.db.page.findOne({
                    where: data.parentPage.connect,
                  })
                : await page.parentPage();

              if (parentPage?.id === where.id) {
                throw new Error("page can't be its own parent");
              }

              const slug = data.slug ?? (await page)?.slug ?? null;

              const path = makePath(parentPage?.path, slug);

              // update path of all child pages
              await updateAllChildPaths(ctx, where.id, path);

              return path;
            },
          },
        }),
      },
    },
  },
  {
    aliasPrefix: "admin",
  }
);
