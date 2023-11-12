import { createRouter as createVueRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

export function createRouter() {
  const router = createVueRouter({
    history: createWebHistory(),
    routes,
  });
  return router;
}
