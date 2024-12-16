export type Locale = typeof locales[number];
export type Locales = typeof locales;

export const locales = ["en", "pt-br"] as const;
export const defaultLocale = "en";

export function isLocale(value: unknown): value is Locale {
  if (typeof value !== "string") return false;
  return locales.includes(value as Locale);
}