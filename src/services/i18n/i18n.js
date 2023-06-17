import { supported, localize } from "./locale";
import { translate } from "./translate";
import { Stateful } from "../../lib";

export class I18n extends Stateful {
  #supported = supported;
  #locale = "en";

  constructor(maybeLocale) {
    super();
    if (maybeLocale) {
      this.locale = maybeLocale;
    }
  }

  get supported() {
    return this.#supported;
  }

  get locale() {
    return this.#locale;
  }

  set locale(maybeLocale) {
    const locale = localize(maybeLocale);
    if (this.#locale === locale) return;

    this.#locale = locale;
    this.notify();
  }

  t(key, values) {
    return translate(this.locale, key, values);
  }

  d(value) {
    return new Intl.DateTimeFormat(this.locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(value);
  }
}
