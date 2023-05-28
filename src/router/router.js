import { createRouter, createWebHistory } from "vue-router";
import { routesPaths, routesConfigs } from "./routes";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: routesPaths.dashboard },
    ...routesConfigs,
    { path: "/:pathMatch(.*)*", redirect: routesPaths.dashboard },
  ],
});
