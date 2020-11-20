const { nextI18NextRewrites } = require("next-i18next/rewrites");
const localeSubpaths = { en: "en", de: "de" };
const { ROOT_URL = "http://localhost:3000" } = process.env;

module.exports = {
  publicRuntimeConfig: {
    localeSubpaths,
    ROOT_URL,
    isDevelopment: process.env.NODE_ENV === "development",
  },

  async rewrites() {
    return [
      {
        source: "/__health",
        destination: "/api/__health",
      },
      ...nextI18NextRewrites(localeSubpaths),
    ];
  },
};
