export type Locale = string;
export type Locales = string[];

interface Options {
  value: unknown;
  supported: Locales;
}

export function isLocale(value: unknown, supported: Locales): value is Locale {
  if (typeof value !== "string") return false;
  return supported.includes(value);
}

export function matchLocale({
  supported,
  value
}: Options): Locale | undefined {
  if (typeof value !== "string") return undefined;

  const maybeLower = value.toLowerCase();

  let newLocale: Locale | undefined;
  for (const locale of supported) {
    if (maybeLower.includes(locale) || locale.includes(maybeLower)) {
      newLocale = locale;
    }
    if (maybeLower === locale) break;
  }

  return newLocale;
}