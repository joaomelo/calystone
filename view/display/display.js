import { createRouter, createWebHistory } from "vue-router";

import { routeOpen, routeSolve, routes } from "./routes";

export class Display {
  gatekeeper;
  router = createRouter({ history: createWebHistory(), routes });
  startPath = window.location.pathname;

  constructor({ gatekeeper }) {
    this.gatekeeper = gatekeeper;
  }

  install(app) {
    app.use(this.router);
  }

  open() {
    this.router.push({ name: routeOpen.name });
  }

  signUp() {
    console.log("signUp");
  }

  async solve() {
    this.router.push({ name: routeSolve.name });
  }

  start() {
    console.log("start");
  }
}
