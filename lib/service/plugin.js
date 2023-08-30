import { inject } from "vue";

const key = Symbol("service");

export function install({ service, app }) {
  app.provide(key, service);
}

export function useService(maybeNameOrNames) {
  const service = inject(key);

  if (!Array.isArray(maybeNameOrNames) && typeof maybeNameOrNames !== "string")
    return service;
  return service.select(maybeNameOrNames);
}
