import { watch } from "vue";
import { createI18n as createVueI18n } from "vue-i18n";

import type { Locale } from "./locales";
import type { MessageSchema } from "./messages";

import { defaultLocale } from "./locales";
import { matchLocale } from "./match";
import { messages } from "./messages";
import { LocaleStorage } from "./storage";

export function createI18n() {
  const localeStorage = new LocaleStorage();
  const locale: Locale = localeStorage.load()
    ?? matchLocale(navigator.language)
    ?? defaultLocale;

  const i18n = createVueI18n<[MessageSchema], Locale, false>({
    fallbackLocale: defaultLocale,
    legacy: false,
    locale,
    messages
  });

  watch(() => i18n.global.locale.value, (value) => { localeStorage.save(value); });

  return i18n;
}
