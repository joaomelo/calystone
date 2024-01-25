import { createRouter, createWebHistory } from "vue-router";

import { routeOpen, routeSignIn, routeSignUp, routeSolve, routes } from "./routes";

export class Helmsman {
  router = createRouter({ history: createWebHistory(), routes });
  startPath = window.location.pathname;

  backInternal() {
    const backPath = this.router.options.history.state.back;
    const backRoute = this.router.resolve(backPath);
    return backRoute.meta.access === "internal"
      ? this.router.back()
      : this.outline();
  }

  open() {
    this.router.push({ name: routeOpen.name });
  }

  signIn() {
    this.router.push({ name: routeSignIn.name });
  }

  signUp() {
    this.router.push({ name: routeSignUp.name });
  }

  solve() {
    this.router.push({ name: routeSolve.name });
  }

  start() {
    console.log("start");
  }
}
