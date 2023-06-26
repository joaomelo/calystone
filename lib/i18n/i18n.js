import { Stateful } from "../utils";

export class I18n extends Stateful {
  _supported;
  _locale;
  _messages;

  constructor(messages) {
    super();
    this._supported = Object.keys(messages);
    this._locale = this._supported[0];
    this._messages = messages;
  }

  get supported() {
    return this._supported;
  }

  get locale() {
    return this._locale;
  }

  set locale(maybeLocale) {
    if (!maybeLocale) return;

    const lowered = maybeLocale.toLowerCase();
    let newLocale = null;
    for (const locale of this._supported) {
      if (lowered.includes(locale) || locale.includes(lowered)) {
        newLocale = locale;
      }
    }

    if (this._locale === newLocale) return;

    this._locale = newLocale;
    this.notify();
  }

  t(key, values) {
    const localeMessages = this._messages[this.locale];
    const baseMessage = localeMessages[key];
    if (!baseMessage) return key;
    if (!values) return baseMessage;

    const replaced = Object.entries(values).reduce((acc, [key, value]) => {
      const token = `{${key}}`;
      return acc.replaceAll(token, value);
    }, baseMessage);
    return replaced;
  }

  d(value) {
    return new Intl.DateTimeFormat(this.locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(value);
  }
}
