import type { Locale } from "./locales";

export interface LocaleRepository {
  load(): Locale;
  save(data: Locale): void;
}