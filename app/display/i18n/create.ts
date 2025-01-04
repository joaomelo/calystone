import { watch } from "vue";
import { createI18n as createVueI18n } from "vue-i18n";

import type { LocaleRepository } from "./locale-repository";
import type { Locale } from "./locales";
import type { MessageSchema } from "./messages";

import { defaultLocale } from "./locales";
import { messages } from "./messages";

export function createI18n(localeRepository: LocaleRepository) {
  const locale = localeRepository.load();

  const i18n = createVueI18n<[MessageSchema], Locale, false>({
    fallbackLocale: defaultLocale,
    legacy: false,
    locale,
    messages
  });

  watch(() => i18n.global.locale.value, (value) => { localeRepository.save(value); });

  return i18n;
}
