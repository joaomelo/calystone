import type { RouteLocationNormalized } from "vue-router";

import { Store } from "@/display/store";

export function guard(to: RouteLocationNormalized) {
  const store = Store.use();
  const routeRequiresConnection = Boolean(to.meta.connected);

  if (routeRequiresConnection === store.connected.value) {
    return true;
  }

  if (store.connected.value) {
    return { name: "folders" };
  }

  return { name: "open" };
}