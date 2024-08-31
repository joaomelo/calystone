import type { OutlineRoute } from "@/display/common";
import type { Component } from "vue";

const PageControlTyped: DefineComponent<{}, {}, any> = PageControl;

import PageControl from "./page-control.vue";

const name = "open";

export default {
  component: PageControl,
  name: name,
  path: `/${name}`,
};



import PageControl from "./page-control.vue";

const name = "open";

// Ensure PageControl is correctly typed as a Vue component

export const routeSignIn: RouteRecordRaw = {
  component: PageControlTyped,
  name: name,
  path: `/${name}`,
};
