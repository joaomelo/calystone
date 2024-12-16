import { useI18n as useVueI18n } from "vue-i18n";

import type { Locale } from "./locales";
import type { MessageSchema } from "./messages";

export function useI18n() {
  return useVueI18n<{ message: MessageSchema }, Locale>({
    inheritLocale: true,
    useScope: "global"
  });
}