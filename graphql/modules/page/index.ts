import { schema } from "nexus";
import { i18nField } from "../../utils/i18n";
import { stringArg } from "nexus/components/schema";

schema.objectType({
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
      resolve: (c) => (c.content ? JSON.parse(c.content) : null), // unfortunatly, sqlite has no json support
    });
    i18nField(t, "navigationTitle");
    i18nField(t, "htmlTitle");
    i18nField(t, "meta_description");
    i18nField(t, "social_title");
    i18nField(t, "social_description");
  },
});

schema.extendType({
  type: "Query",
  definition(t) {
    t.field("page", {
      type: "Page",
      args: {
        path: stringArg(),
        pageId: stringArg(),
      },
      resolve(root, args, { db }) {
        const selector = args.pageId
          ? { id: args.pageId }
          : { path: args.path };
        return db.page.findOne({ where: selector });
      },
    });
    t.list.field("pages", {
      type: "Page",
      args: {
        parentPageId: stringArg(),
        parentPath: stringArg(),
      },
      resolve(root, { parentPageId, parentPath }, { db }) {
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
        return db.page.findMany({
          where,
        });
      },
    });
  },
});
