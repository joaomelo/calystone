import { createI18n as createUtilsI18n } from "@/display/affordances/i18n";

import type { MessageSchema } from "./messages";

import { messages } from "./messages";

export function createI18n() {
  return createUtilsI18n<MessageSchema>({
    messages,
    storageKey: "locale"
  });
}
