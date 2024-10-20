import { useI18n as useVueI18n } from "vue-i18n";

import { type AvailableLocales, type MessageSchema } from "./messages";

export function useI18n() {
  return useVueI18n<{ message: MessageSchema }, AvailableLocales>({
    inheritLocale: true,
    useScope: "global"
  });
}