import { schema, use, settings, server } from "nexus";

import { prisma } from "nexus-plugin-prisma";
import { shield } from "nexus-plugin-shield";
import { auth } from "nexus-plugin-jwt-auth";

import { APP_SECRET } from "./utils/user";
import { rules } from "./permissions";
import { getRequestLang } from "./utils/i18n";

import "./modules/admin";
import "./modules/user";
import "./modules/files";
import "./modules/blogPost";
import "./modules/page";
import "./modules/product";
import "./modules/order";

schema.addToContext(({ req, res }) => {
  return {
    lang: getRequestLang(req),
  };
});

settings.change({
  server: {
    graphql: {
      introspection: true,
    },
    playground: {
      settings: {
        "request.credentials": "include",
      },
    },
  },
});

use(
  auth({
    appSecret: APP_SECRET,
    useCookie: true,
    cookieName: "token",
  })
);
use(
  prisma({
    paginationStrategy: "prisma",
    features: {
      crud: true,
    },
  })
);

use(
  shield({
    rules,
    options: {
      allowExternalErrors: true,
    },
  })
);
