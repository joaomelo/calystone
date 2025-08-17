import {
  createRouter as createVueRouter,
  createWebHistory
} from "vue-router";

import { guard } from "./guard";
import { routes } from "./routes";

export function createRouter() {

  const router = createVueRouter({
    history: createWebHistory(),
    routes
  });
  router.beforeEach(guard);

  return router;
}
