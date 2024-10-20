import { type App, inject, type InjectionKey } from "vue";

import { type Store } from "./store";

const key: InjectionKey<Store> = Symbol("store");

export function provideStore(store: Store, app: App) {
  app.provide(key, store);
}

export function useStore() {
  const maybeStore = inject(key);
  if (!maybeStore) {
    throw new Error("store was not provided during initialization");
  }
  return maybeStore;
}
