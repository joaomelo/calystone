import { inject } from "vue";
import { key } from "./i18n";

export function useI18n() {
  const i18n = inject(key);

  if (!i18n)
    throw new Error(
      "the i18n singleton must be installed in the vue app as a plugin"
    );

  const t = (key, values) => i18n.t(key, values);

  return { i18n, t };
}
