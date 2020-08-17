import NextI18Next from "next-i18next";

import getConfig from "next/config";
//import moment from "moment";
//import "moment/locale/de";

import path from "path";

const { localeSubpaths = {}, isDevelopment } =
  getConfig()?.publicRuntimeConfig ?? {};

export const SUPPORTED_LANGS = ["en", "de"];
export const DEFAULT_LANG = SUPPORTED_LANGS[0];

/*

const missingKeyHandler = ([lng], ns, key) => {
  if (!lng) {
    return;
  }
  console.warn(`key missing: [${lng}] ${ns}:${key}`, process.browser);

  if (!process.browser && lng) {
    const saveMissingServer = require("./saveMissingServer").default;

    saveMissingServer(lng, key, ns);
  } else {
    fetch(`${publicRuntimeConfig.ROOT_URL}/api/__missingKey`, {
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: "POST",
      body: JSON.stringify({ lng, ns, key }),
    });
  }
};
*/

const nextI18Next = new NextI18Next({
  defaultLanguage: DEFAULT_LANG,
  otherLanguages: SUPPORTED_LANGS.filter((l) => l !== DEFAULT_LANG),
  localePath: path.resolve("./public/locales"),
  localeSubpaths,
  //saveMissing: isDevelopment,
  //missingKeyHandler,
  defaultNS: "common",
});

export default nextI18Next;

const {
  useTranslation,
  Trans,
  appWithTranslation,
  Link,
  Router,
  i18n,
} = nextI18Next;

/*
moment.locale(["de"]);

nextI18Next.i18n.on("languageChanged", (locale) => {
  moment.locale([locale, DEFAULT_LANG]);
});
*/

const changeLanguage = i18n.changeLanguage;
export {
  useTranslation,
  Trans,
  appWithTranslation,
  Link,
  Router,
  changeLanguage,
  i18n,
};
