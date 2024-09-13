import type { RouteRecordRaw } from "vue-router";

import component from "./control-open.vue";

const name = "open";
export const routeOpen: RouteRecordRaw = {
  component,
  name: name,
  path: `/${name}`,
};
