import { makeSchema } from "@nexus/schema";
import { ApolloServer } from "apollo-server-micro";
import { shield } from "graphql-shield";
import { applyMiddleware } from "graphql-middleware";
import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema";
import { verify } from "jsonwebtoken";

import * as path from "path";
import * as userTypes from "./modules/user";
import * as adminTypes from "./modules/admin";
import * as blogPostTypes from "./modules/blogPost";
import * as fileTypes from "./modules/files";
import * as pageTypes from "./modules/page";

import prisma from "../lib/prismaServer";
import permissions from "./permissions";
import { Context } from "./types";
import { APP_SECRET } from "./utils/user";
import { getRequestLang } from "./utils/i18n";

const types = [userTypes, blogPostTypes, fileTypes, pageTypes, adminTypes];

const typegenPath = (p: string) =>
  process.env.PWD ? path.join(process.env.PWD, p) : p;

const schema = makeSchema({
  types,
  plugins: [
    nexusSchemaPrisma({
      experimentalCRUD: true,
      paginationStrategy: "prisma",
      outputs: {
        typegen: typegenPath("./generated/nexus-prisma.ts"),
      },
    }),
  ],
  typegenAutoConfig: {
    contextType: "t.Context",
    sources: [
      {
        source: typegenPath("./graphql/types.ts"),
        alias: "t",
      },
    ],
  },
  outputs: {
    schema: typegenPath("./generated/schema.graphql"),
    typegen: typegenPath("./generated/nexus.ts"),
  },
});

const middlewares = [
  shield(permissions, {
    // we handle this ourselfs
    allowExternalErrors: true,
  }),
].filter((middleware) => middleware);

export default new ApolloServer({
  schema: applyMiddleware(schema, ...middlewares),
  introspection: true,

  playground: {
    settings: {
      "request.credentials": "include",
    },
  },
  context: async (ctx): Promise<Context> => {
    let user = null;

    const token = ctx.req.headers.authorization || ctx.req.cookies?.token;

    if (token) {
      const { userId } = verify(token, APP_SECRET) as { userId: string };
      user = await prisma.user.findOne({
        where: {
          id: userId,
        },
        include: {
          roles: true,
        },
      });
    }

    const lang = getRequestLang(ctx.req);

    return { prisma, user, res: ctx.res, lang };
  },
});
