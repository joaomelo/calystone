import { Locales } from "./locales";
import { attemptLocaleMatch } from "./match";

const localeStorageKey = "locale";

export function loadLocale(): string {
  const storedLocale = localStorage.getItem(localeStorageKey);
  const initialLocale = storedLocale ?? navigator.language;

  const maybeLocale = attemptLocaleMatch(initialLocale, Locales.supported);
  return maybeLocale ?? Locales.default;
}

export function saveLocale(locale: string) {
  localStorage.setItem(localeStorageKey, locale);
}