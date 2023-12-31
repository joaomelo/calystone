import { inject } from "vue";
import { key } from "./key";

export function useI18n() {
  const i18n = inject(key);

  if (!i18n)
    throw new Error(
      "the i18n singleton must be installed in the vue app as a plugin"
    );

  const t = (key, values) => i18n.t(key, values);
  const d = (date) => i18n.d(date);

  return { i18n, t, d };
}
