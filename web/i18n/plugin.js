import { inject } from "vue";

const key = Symbol("i18n");

export function install({ i18n, app }) {
  app.provide(key, i18n);
}

export function useI18n() {
  return inject(key);
}

export function useT() {
  const i18n = useI18n();
  const t = (...params) => i18n.t(...params);
  return t;
}
