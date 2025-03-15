import en from "./messages-en.json";
import ptBr from "./messages-pt-br.json";

export type MessageSchema = typeof en;

export const messages = {
  "en": en,
  "pt-br": ptBr
} as const;
