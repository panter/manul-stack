import { schema } from "nexus";
import { getUserId } from "../../utils/user";

schema.objectType({
  name: "OrderItem",
  definition(t) {
    t.model.id();
    t.model.product();
    t.model.order(null);
  },
});

schema.objectType({
  name: "Order",
  definition(t) {
    t.model.id();
    t.model.created();
    t.model.orderItems(null);
    t.model.user();
  },
});

schema.extendType({
  type: "Mutation",
  definition(t) {
    t.field("placeOrder", {
      type: "Order",
      async resolve(root, args, ctx) {
        const cart = await ctx.db.cart.findOne({
          where: { id: getUserId(ctx.token) },
          include: { cartItems: true },
        });

        return ctx.db.order.create({
          data: {
            orderItems: {
              create: cart.cartItems.map((cartItem) => {
                return {
                  product: { connect: { id: cartItem.productId } },
                };
              }),
            },
            user: { connect: getUserId(ctx.token) },
          },
        });
      },
    });
  },
});
