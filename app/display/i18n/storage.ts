import { LocalStorage } from "@/utils";

import type { Locale } from "./locales";

import { matchLocale } from "./match";

export class LocaleStorage extends LocalStorage<Locale> {
  constructor() {
    super("locale", matchLocale);
  }
}
