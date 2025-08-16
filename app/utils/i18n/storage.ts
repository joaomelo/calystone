import { LocalStorage } from "@/utils/storages";

import type {
  Locale,
  Locales
} from "./locales";

import { matchLocale } from "./locales";

interface Options {
  supported: Locales;
  storageKey: string;
}

export class LocaleStorage extends LocalStorage<Locale> {
  constructor({
    storageKey,
    supported
  }: Options) {
    super(storageKey, (value) => matchLocale({
      supported,
      value
    }));
  }
}
