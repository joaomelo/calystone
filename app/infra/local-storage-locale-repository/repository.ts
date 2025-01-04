import type { Locale, LocaleRepository } from "@/display";

import { LocalStorage } from "@/utils";

import { matchLocale } from "./match";

export class LocalStorageLocaleRepository extends LocalStorage<Locale> implements LocaleRepository {
  constructor() {
    super("locale", matchLocale);
  }
}
