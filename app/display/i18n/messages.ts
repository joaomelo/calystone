import type { Locale } from "./locales";

import en from "./messages-en.json";
import ptBr from "./messages-pt-br.json";

export type MessageSchema = typeof en;
export type Messages = {
  [key in Locale]: MessageSchema;
};

export const messages: Messages = {
  "en": en,
  "pt-br": ptBr
};
