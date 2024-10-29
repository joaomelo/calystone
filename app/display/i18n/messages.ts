import en from "./messages-en.json";
import ptBr from "./messages-pt-br.json";

export const messages = {
  "en": en,
  "pt-br": ptBr
};

export type MessageSchema = typeof en;
export type AvailableLocales = keyof typeof messages;