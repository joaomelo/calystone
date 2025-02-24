import type { Locale } from "./locales";

import en from "./messages-en.json";
import ptBr from "./messages-pt-br.json";

export type Messages = Record<Locale, MessageSchema>;
export type MessageSchema = typeof en;

export const messages: Messages = {
  "en": en,
  "pt-br": ptBr
};
