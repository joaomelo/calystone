import { toValue, watch } from "vue";
import { createI18n as createVueI18n } from "vue-i18n";

import type { AvailableLocales, MessageSchema } from "./messages";

import { loadLocale, saveLocale } from "./locale";
import { Locales } from "./locales";
import { messages } from "./messages";

export function createI18n() {

  const locale = loadLocale();

  const i18n = createVueI18n<[MessageSchema], AvailableLocales>({
    fallbackLocale: Locales.default,
    legacy: false,
    locale,
    messages
  });

  watch(() => toValue(i18n.global.locale), saveLocale);

  return i18n;
}