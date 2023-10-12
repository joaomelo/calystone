import type { App, Ref, InjectionKey } from "vue";
import type { Locale } from "./locales";
import type { MessageKey, MessageValues } from "./messages";

import { ref } from "vue";
import { messages } from "./messages";
import { supported } from "./locales";

export const key: InjectionKey<I18n> = Symbol("i18n");

export class I18n {
  _locale: Ref<Locale> = ref(supported[0]);

  constructor(maybeLocale: string) {
    this.updateLocale(maybeLocale);
  }

  get supported() {
    return supported;
  }

  get locale() {
    return this._locale.value;
  }

  get messages() {
    return messages[this.locale];
  }

  updateLocale(maybeLocale: string) {
    if (!maybeLocale) return;

    const lowered = maybeLocale.toLowerCase();
    let newLocale = null;
    for (const locale of this.supported) {
      if (lowered.includes(locale) || locale.includes(lowered)) {
        newLocale = locale;
      }
    }
    if (!newLocale) return;
    if (this.locale === newLocale) return;

    this._locale.value = newLocale;
  }

  t(key: MessageKey, values?: MessageValues) {
    const baseMessage = this.messages[key];
    if (!values) return baseMessage;

    const replaced = Object.entries(values).reduce((acc, [key, value]) => {
      const token = `{${key}}`;
      return acc.replaceAll(token, value);
    }, baseMessage);
    return replaced;
  }

  d(value: Date) {
    return new Intl.DateTimeFormat(this.locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(value);
  }

  install(app: App) {
    app.provide(key, this);
  }
}
