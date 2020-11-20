import { extendType, objectType, stringArg } from "@nexus/schema";
import { i18nField } from "../../utils/i18n";

export const Page = objectType({
  name: "Page",
  definition(t) {
    t.model.id();
    t.model.slug();

    t.model.published();
    t.model.path();
    t.model.parentPage();
    t.model.childPages({
      ordering: true,
    });

    t.model.sortKey();

    t.field("content", {
      type: "Json",
      resolve: (c: any) => (c.content ? JSON.parse(c.content) : null), // unfortunatly, sqlite has no json support
    });
    i18nField(t, "navigationTitle");
    i18nField(t, "htmlTitle");
    i18nField(t, "meta_description");
    i18nField(t, "social_title");
    i18nField(t, "social_description");
  },
});

export const Query = extendType({
  type: "Query",
  definition(t) {
    t.field("page", {
      type: "Page",
      args: {
        path: stringArg(),
        pageId: stringArg(),
      },
      resolve(root, args, { prisma }) {
        const selector = args.pageId
          ? { id: args.pageId }
          : { path: args.path };
        return prisma.page.findOne({ where: selector });
      },
    });
    t.list.field("pages", {
      type: "Page",
      args: {
        parentPageId: stringArg(),
        parentPath: stringArg(),
      },
      resolve(root, { parentPageId, parentPath }, { prisma }) {
        const where = parentPageId
          ? { parentPageId }
          : parentPath
          ? { parentPage: { path: parentPath } }
          : {
              OR: [
                {
                  parentPageId: null,
                  path: {
                    not: "/",
                  },
                },
                {
                  parentPage: {
                    path: "/",
                  },
                },
              ],
            };
        return prisma.page.findMany({
          where,
        });
      },
    });
  },
});
