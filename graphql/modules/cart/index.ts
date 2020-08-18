import { schema } from "nexus";
import { getUserId } from "../../utils/user";

schema.objectType({
  name: "CartItem",
  definition(t) {
    t.model.id();
    t.model.product();
    t.model.cart(null);
  },
});

schema.objectType({
  name: "Cart",
  definition(t) {
    t.model.id();
    t.model.created();
    t.model.cartItems();
    t.model.user();
  },
});

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
        return (
          await ctx.db.cartItem.create({
            data: {
              cart: {
                connectOrCreate: {
                  create: {
                    user: { connect: { id: getUserId(ctx.token) } },
                  },
                  where: { userId: getUserId(ctx.token) },
                },
              },
              product: { connect: product },
              quantity,
            },
            include: {
              cart: true,
            },
          })
        ).cart;
      },
    });
  },
});
