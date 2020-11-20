import { addCrudResolvers } from "@ra-data-prisma/backend";

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
  ctx,
  parentId: string,
  parentPath: string
) => {
  const childPages = await ctx.prisma.page.findMany({
    where: {
      parentPageId: parentId,
    },
  });

  await Promise.all(
    childPages.map(async (child) => {
      const childPath = makePath(parentPath, child.slug);
      await ctx.prisma.page.update({
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

const addAdminCrudResolvers = (name: string, options = {}) =>
  addCrudResolvers(name, {
    printSecurityWarning: false,
    aliasPrefix: "admin",
    ...options,
  });

export const adminUser = addAdminCrudResolvers("User");
export const adminUserRole = addAdminCrudResolvers("UserRole");
export const adminBlogPost = addAdminCrudResolvers("BlogPost");
export const adminPage = addAdminCrudResolvers("Page", {
  customize: {
    createOne: (d) => ({
      ...d,
      computedInputs: {
        path: async ({ ctx, args: { data } }: { ctx; args: any }) => {
          const parentPage = data.parentPage?.connect
            ? await ctx.prisma.page.findOne({
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
        path: async ({ ctx, args: { where, data } }) => {
          const page = ctx.prisma.page.findOne({ where });

          const parentPage = data.parentPage?.connect
            ? await ctx.prisma.page.findOne({
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
});
