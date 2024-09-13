import type { RouteRecordRaw } from "vue-router";

import component from "./control-connect.vue";

const name = "connect";
export const routeConnect: RouteRecordRaw = {
  component,
  name: name,
  path: `/${name}`,
};
