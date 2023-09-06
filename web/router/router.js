import { createRouter as createVueRouter, createWebHistory } from "vue-router";
import { routesPaths, routesConfigs } from "./routes";

export function createRouter() {
  const router = createVueRouter({
    history: createWebHistory(),
    routes: [
      { path: "/", redirect: routesPaths.loading },
      ...routesConfigs,
      { path: "/:pathMatch(.*)*", redirect: routesPaths.loading },
    ],
  });

  return router;
}
