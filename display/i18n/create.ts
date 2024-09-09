import { createI18n as createVueI18n } from "vue-i18n";

import { attemptLocaleMatch } from "./match";
import { type AvailableLocales, messages, type MessageSchema } from "./messages";

export function createI18n() {

  const supported = Object.keys(messages);
  const maybeLocale = attemptLocaleMatch(navigator.language, supported);
  
  const i18n = createVueI18n<[MessageSchema], AvailableLocales>({
    fallbackLocale: "en",
    legacy: false,
    locale: maybeLocale ?? "en",
    messages
  });
  
  return i18n;
}