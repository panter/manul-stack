import { schema } from "nexus";
import { textChangeRangeIsUnchanged } from "typescript";

schema.objectType({
  name: "Order",
  definition(t) {
    t.model.id();
    t.model.type();
    t.model.products();
    t.model.created();
  },
});

schema.inputObjectType({
  name: "UpsertCartProductsInput",
  definition(t) {
    t.int("quantity");
    t.string("productId");
  },
});

schema.inputObjectType({
  name: "UpsertCartInput",
  definition(t) {
    t.field("products", { type: "UpsertCartProductsInput", list: true });
  },
});

schema.extendType({
  type: "Mutation",
  definition(t) {
    t.field("upsertCart", {
      type: "Order",
      async resolve(root, args, ctx) {
        return await ctx.db.order.create({
          data: {
            products: { connect: { id: "" } },
            created: new Date(),
            type: "pending",
          },
        });
      },
    });
  },
});
