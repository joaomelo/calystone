import type { Locale } from "./locales";

import { locales } from "./locales";

export function matchLocale(unknownLocale: unknown): Locale | undefined{
  if (typeof unknownLocale !== "string") return undefined;

  const maybeLower = unknownLocale.toLowerCase();

  let newLocale: Locale | undefined;
  for (const locale of locales) {
    if (maybeLower.includes(locale) || locale.includes(maybeLower)) {
      newLocale = locale;
    }
    if (maybeLower === locale) break;
  }

  return newLocale;
}