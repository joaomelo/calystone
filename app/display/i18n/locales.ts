import { messages } from "./messages";

export const Locales = {
  default: "en",
  supported: Object.keys(messages)
} as const;