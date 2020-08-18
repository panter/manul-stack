import { schema } from "nexus";

schema.objectType({
  name: "ProductTag",
  definition(t) {
    t.model.id();
    t.model.title();
  },
});
schema.objectType({
  name: "Product",
  definition(t) {
    t.model.id();
    t.model.slug();
    t.model.title();
    t.model.imageUrl();
    t.model.tags(null);
  },
});

schema.extendType({
  type: "Query",
  definition(t) {
    t.crud.products({ filtering: true });
  },
});
