import { schema } from "nexus";

schema.objectType({
  name: "Product",
  definition(t) {
    t.model.id();
    t.model.slug();
    t.model.title();
    t.model.imageUrl();
  },
});

schema.extendType({
  type: "Query",
  definition(t) {
    t.crud.products({ filtering: true });
  },
});
