import { schema } from "nexus";
import { textChangeRangeIsUnchanged } from "typescript";
import { getUserId } from "../../utils/user";

schema.objectType({
  name: "Order",
  definition(t) {
    t.model.id();
    t.model.status();
    t.model.orderItems(null);
    t.model.created();
  },
});

schema.objectType({
  name: "OrderItem",
  definition(t) {
    t.model.id();
    t.model.product();
    t.model.order();
    t.model.quantity();
  },
});

schema.objectType({
  name: "Cart",
  definition(t) {
    t.model.id();
    t.model.cartItems(null);
    t.model.created();
  },
});

schema.objectType({
  name: "CartItem",
  definition(t) {
    t.model.id();
    t.model.product();
    t.model.cart();
    t.model.quantity();
  },
});

// schema.inputObjectType({
//   name: "UpsertCartProductsInput",
//   definition(t) {
//     t.int("quantity");
//     t.string("productId");
//   },
// });

// schema.inputObjectType({
//   name: "AddToCart",
//   definition(t) {
//     t.field("products", { type: "UpsertCartProductsInput", list: true });
//   },
// });

schema.extendType({
  type: "Mutation",
  definition(t) {
    t.field("addToCart", {
      type: "Cart",
      args: {
        product: schema.arg({ type: "ProductWhereUniqueInput" }),
        quantity: schema.intArg(),
      },
      async resolve(root, { product, quantity }, ctx) {
        return await ctx.db.cartItem
          .create({
            data: {
              product: { connect: product },
              quantity,
              cart: {
                connectOrCreate: {
                  where: { userId: getUserId(ctx.token) },
                  create: {
                    user: { connect: { id: getUserId(ctx.token) } },
                  },
                },
              },
            },
          })
          .cart();
      },
    });
  },
});
