import { watch } from "vue";
import { createI18n as createVueI18n } from "vue-i18n";

import type { Locale } from "./locales";
import type { Messages } from "./messages";

import { matchLocale } from "./locales";
import { LocaleStorage } from "./storage";

interface Options<MessageSchema> {
  messages: Messages<MessageSchema>;
  storageKey: string;
}

export function createI18n<MessageSchema>({
  messages,
  storageKey
}: Options<MessageSchema>) {
  const supported = Object.keys(messages);
  const [fallbackLocale] = supported;

  const localeStorage = new LocaleStorage({
    storageKey,
    supported
  });
  const locale: Locale = localeStorage.load()
    ?? matchLocale({
      supported,
      value: navigator.language
    })
    ?? fallbackLocale;

  const i18n = createVueI18n<[MessageSchema], Locale, false>({
    fallbackLocale,
    legacy: false,
    locale,
    messages
  });

  watch(() => i18n.global.locale.value, (value) => { localeStorage.save(value); });

  return i18n;
}