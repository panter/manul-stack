import { schema } from "nexus";
import { i18nField } from "../../utils/i18n";

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
