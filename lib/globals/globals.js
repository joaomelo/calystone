import { inject } from "vue";

const key = "globals";

export function globalize(globals = {}) {
  return (app) => {
    app.provide(key, globals);
  };
}

export function useGlobals() {
  return inject(key);
}
