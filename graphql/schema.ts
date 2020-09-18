import { schema, use, settings } from "nexus";

import { prisma } from "nexus-plugin-prisma";
import { deny, shield } from "nexus-plugin-shield";
import { auth } from "nexus-plugin-jwt-auth";

import { APP_SECRET } from "./utils/user";
import { rules } from "./permissions";
import { getRequestLang } from "./utils/i18n";

import "./modules/admin";
import "./modules/user";
import "./modules/files";
import "./modules/blogPost";
import "./modules/page";

schema.addToContext(({ req, res }) => {
  return {
    lang: getRequestLang(req),
  };
});

settings.change({
  server: {
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
      fallbackRule: deny,
      debug: true,
    },
  })
);
