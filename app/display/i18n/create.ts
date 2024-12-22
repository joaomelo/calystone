import { LocalStorage } from "@/repositories";
import { watch } from "vue";
import { createI18n as createVueI18n } from "vue-i18n";

import type { Locale } from "./locales";
import type { MessageSchema } from "./messages";

import { defaultLocale } from "./locales";
import { matchLocale } from "./match";
import { messages } from "./messages";

export function createI18n() {
  const localeStorage = new LocalStorage("locale", matchLocale);
  const locale = localeStorage.load();

  const i18n = createVueI18n<[MessageSchema], Locale, false>({
    fallbackLocale: defaultLocale,
    legacy: false,
    locale,
    messages
  });

  watch(() => i18n.global.locale.value, (value) => { localeStorage.save(value); });

  return i18n;
}
