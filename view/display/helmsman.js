import { createRouter, createWebHistory } from "vue-router";

import { routeOpen, routeSignIn, routeSignUp, routeSolve, routes } from "./routes";

export class Helmsman {
  router = createRouter({ history: createWebHistory(), routes });
  startPath = window.location.pathname;

  open() {
    this.router.push({ name: routeOpen.name });
  }

  outline() {
    console.log("outline");
  }

  return() {
    const backPath = this.router.options.history.state.back;
    const backRoute = this.router.resolve(backPath);
    return backRoute.meta.access === "internal"
      ? this.router.back()
      : this.outline();
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
    const startRoute = this.router.resolve(this.startPath);
    return startRoute.meta.access === "internal"
      ? this.router.push(startRoute)
      : this.outline();
  }
}
