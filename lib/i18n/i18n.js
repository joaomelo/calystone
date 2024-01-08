import { reactive } from "vue";

import { key } from "./key";
import { extractSupported, matchLocale } from "./locales";
import { normalizeMessages } from "./messages";
import { translate } from "./translate";

export class I18n {
  state = reactive({
    locale: null,
    messages: null,
  });

  constructor({ locale, messages }) {
    this.state.messages = normalizeMessages(messages);
    this.updateLocale(locale);
  }

  d(value) {
    return new Intl.DateTimeFormat(this.locale).format(value);
  }

  install(app) {
    app.provide(key, this);
  }

  t(key, values) {
    return translate({
      key,
      locale: this.locale,
      messages: this.messages,
      values,
    });
  }

  updateLocale(maybeLocale) {
    const newLocale = matchLocale(maybeLocale, this.supported);
    if (this.locale === newLocale) return;
    this.state.locale = newLocale;
  }

  get locale() {
    return this.state.locale;
  }

  get messages() {
    return this.state.messages;
  }

  get supported() {
    return extractSupported(this.state.messages);
  }
}
