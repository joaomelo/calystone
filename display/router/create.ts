import { createRouter as createVueRouter, createWebHistory } from "vue-router";

import { routeOpen } from "./routes";

export function createRouter() {
  const routes = [
    { path: "/", redirect: routeOpen.path },
    routeOpen,
    { path: "/:pathMatch(.*)*", redirect: routeOpen.path },
  ];

  const router = createVueRouter({ history: createWebHistory(), routes });
  return router;
}
