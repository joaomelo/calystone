import { reactive, inject } from "vue";

const key = "store";

export function createStore(data = {}) {
  const store = reactive(data);
  store.install = (app) => {
    app.provide(key, store);
  };
  return store;
}

export function useStore() {
  return inject(key);
}
