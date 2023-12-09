import { createRouter as createVueRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

export function createRouter() {
  return createVueRouter({
    history: createWebHistory(),
    routes,
  });
}
