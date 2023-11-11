import { reactive } from "vue";
import { extractSupported, matchLocale } from "./locales";
import { translate } from "./translate";
import { normalizeMessages } from "./messages";
import { key } from "./key";

export class I18n {
  state = reactive({
    locale: null,
    messages: null,
  });

  constructor({ locale, messages }) {
    this.state.messages = normalizeMessages(messages);
    this.updateLocale(locale);
  }

  get supported() {
    return extractSupported(this.state.messages);
  }

  get locale() {
    return this.state.locale;
  }

  get messages() {
    return this.state.messages;
  }

  updateLocale(maybeLocale) {
    const newLocale = matchLocale(maybeLocale, this.supported);
    if (this.locale === newLocale) return;

    this.state.locale = newLocale;
  }

  t(key, values) {
    return translate({
      key,
      values,
      locale: this.locale,
      messages: this.messages,
    });
  }

  d(value) {
    return new Intl.DateTimeFormat(this.locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(value);
  }

  install(app) {
    app.provide(key, this);
  }
}
