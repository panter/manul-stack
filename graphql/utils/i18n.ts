import { parse as parseAcceptLang } from "accept-language-parser";

import { DEFAULT_LANG, SUPPORTED_LANGS } from "../../src/config/i18n";
import { Request } from "nexus/dist/runtime/schema/schema";

export const getRequestLang = (req: Request) => {
  const langArg = req.url?.split("/")[1];

  if (langArg && SUPPORTED_LANGS.includes(langArg)) {
    return langArg;
  }
  const acceptLang = parseAcceptLang(req.headers["accept-language"] ?? "");
  return (
    acceptLang.find((l) => SUPPORTED_LANGS.includes(l.code))?.code ??
    DEFAULT_LANG
  );
};
export const i18nField = (t: any, name: string, type: "String" = "String") => {
  t.field(name, {
    type,
    nullable: true,
    resolve(c: any, args: unknown, { lang }: any) {
      return c[`${name}_${lang}`] ?? c[`${name}_${DEFAULT_LANG}`];
    },
  });
  // additionally add fields raw for admins
  SUPPORTED_LANGS.forEach((lang) => {
    t.field(`${name}_${lang}`, { type, nullable: true });
  });
};
