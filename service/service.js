import { inject } from "vue";
import { createDb } from "./factory";

const key = "service";

export function createService(options) {
  const service = {};
  service.db = createDb(options);
  service.install = (app) => {
    app.provide(key, service);
  };

  return service;
}

export function useService() {
  return inject(key);
}
