import { createRouter as createVueRouter, createWebHistory } from "vue-router";

import { routeOpen, routes } from "./routes";

export class Display {
  router = createVueRouter({ history: createWebHistory(), routes });
  start = window.location.pathname;

  install(app) {
    app.use(this.router);
  }

  open() {
    this.router.push({ name: routeOpen.name });
  }
}
