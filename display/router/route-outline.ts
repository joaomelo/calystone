import type { RouteRecordRaw } from "vue-router";

import component from "./control-outline.vue";

const name = "outline";
export const routeOutline: RouteRecordRaw = {
  component,
  meta: { access: "internal" },
  name: name,
  path: `/${name}/:parentId?`,
  props: true,
};


