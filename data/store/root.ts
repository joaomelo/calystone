import { type UnwrapRef } from "vue";

import { type Store } from "./store";

export function setRoot(handle: UnwrapRef<Store["root"]>, store: Store) {
  store.root.value = handle;
  store.artifacts.clear();
}

export function clearRoot(store: Store) {
  setRoot(undefined, store);
}