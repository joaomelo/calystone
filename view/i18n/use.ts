import type { MessageKey, MessageValues } from "./messages";

import { inject } from "vue";
import { key } from "./i18n";

export function useI18n() {
  const i18n = inject(key);
  if (!i18n)
    throw new Error(
      "the i18n singleton must be installed in the vue app as a plugin"
    );
  return i18n;
}

export function useT() {
  const i18n = useI18n();
  const t = (key: MessageKey, values: MessageValues) => i18n.t(key, values);
  return t;
}
