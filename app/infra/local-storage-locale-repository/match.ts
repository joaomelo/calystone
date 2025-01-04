import type { Locale } from "@/display";

import { defaultLocale, locales } from "@/display";

export function matchLocale(unknownLocale: unknown): Locale {
  const maybeLocale = typeof unknownLocale === "string" ? unknownLocale : navigator.language;
  const maybeLower = maybeLocale.toLowerCase();

  let newLocale: Locale = defaultLocale;
  for (const locale of locales) {
    if (maybeLower.includes(locale) || locale.includes(maybeLower)) {
      newLocale = locale;
    }
    if (maybeLower === locale) break;
  }

  return newLocale;
}