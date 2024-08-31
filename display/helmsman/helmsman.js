import { createRouter, createWebHistory } from "vue-router";

import {
  routeOpen,
  routeOutline,
  routeSignIn,
  routeSignUp,
  routeSolve,
  routes,
} from "./routes";

export class Helmsman {
  router = createRouter({ history: createWebHistory(), routes });
  startPath = window.location.pathname;

  install(app) {
    app.use(this.router);
  }

  open() {
    this.router.push({ name: routeOpen.name });
  }

  outline(parentId = null) {
    this.router.push({ name: routeOutline.name, params: { parentId } });
  }

  preferences() {
    console.log("preferences");
  }

  return() {
    const backPath = this.router.options.history.state.back;
    const backRoute = this.router.resolve(backPath);
    backRoute.meta.access === "internal"
      ? this.router.back()
      : this.outline();
  }

  search() {
    console.log("search");
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

  tags() {
    console.log("tags");
  }
}
