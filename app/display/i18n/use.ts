import { Exception } from "@/utils";
import { useI18n as useVueI18n } from "vue-i18n";

import type { Locale } from "./locales";
import type { MessageSchema } from "./messages";

export function useI18n() {
  const utils = useVueI18n<{ message: MessageSchema }, Locale>({
    inheritLocale: true,
    useScope: "global"
  });

  const tError = (error: unknown) => {
    const baseKey = typeof error === "string"
      ? error
      : (error instanceof Exception)
        ? error.code
        : (error instanceof Error)
          ? error.message
          : "UNKNOWN_ERROR";

    const message = utils.te(baseKey)
      ? utils.t(baseKey)
      : utils.te(`errors.${baseKey}`)
        ? utils.t(`errors.${baseKey}`)
        : baseKey;

    return message;
  };

  return { ...utils, tError };
}
