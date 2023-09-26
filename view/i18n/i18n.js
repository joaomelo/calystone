import { reactive } from "vue";
import { install } from "./plugin";
import { messages } from "./messages";

const supported = Object.keys(messages);

export class I18n {
  state = reactive({
    locale: supported[0],
    supported,
    messages,
  });

  constructor(maybeLocale) {
    this.updateLocale(maybeLocale);
  }

  get supported() {
    return this.state.supported;
  }

  get locale() {
    return this.state.locale;
  }

  get messages() {
    return this.state.messages[this.locale];
  }

  updateLocale(maybeLocale) {
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

    this.state.locale = newLocale;
  }

  t(key, values) {
    const baseMessage = this.messages[key];
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

  install(app) {
    return install({ i18n: this, app });
  }
}
