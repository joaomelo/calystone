import { routeConnect, routeOpen, routeOutline } from "@display/views";
import { createRouter as createVueRouter, createWebHistory } from "vue-router";

export function createRouter() {
  const routes = [
    { path: "/", redirect: routeOpen.path },

    routeConnect,
    routeOpen,

    routeOutline,

    { path: "/:pathMatch(.*)*", redirect: routeOpen.path },
  ];

  const router = createVueRouter({ history: createWebHistory(), routes });
  return router;
}
