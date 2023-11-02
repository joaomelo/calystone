import type { App } from "vue";
import type { Router } from "vue-router";

import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

export class Display {
  private router: Router;
  private entryPath: string;

  constructor(app: App) {
    this.entryPath = window.location.pathname;
    this.router = createRouter({
      history: createWebHistory(),
      routes,
    });
    app.use(this.router);
  }

  signIn() {
    const entryRoute = this.router.resolve(this.entryPath);
    const canRedirect = entryRoute && entryRoute.meta.internal;
    if (canRedirect) return this.push(this.entryPath);

    return this.plan();
  }

  signOut() {
    return this.push("/page-auth");
  }

  plan() {
    return this.push("/page-artifacts-plan");
  }

  edit() {
    return this.push("/page-artifacts-edit");
  }

  private push(path: string) {
    return this.router.push(path);
  }
}
