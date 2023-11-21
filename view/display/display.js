import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import { key } from "./key";

export class Display {
  router;
  start;

  constructor() {
    this.start = window.location.pathname;
    this.router = createRouter({
      history: createWebHistory(),
      routes,
    });
  }

  pageSolve() {
    return this.router.push({ name: "page-solve" });
  }

  pageAuth() {
    return this.router.push({ name: "page-auth" });
  }

  pageStart() {
    const route = this.router.resolve(this.start);
    return route.meta.intra
      ? this.router.push(route)
      : this.pageArtifactsPlan();
  }

  pageArtifactsPlan() {
    return this.router.push({ name: "page-artifacts-plan" });
  }

  pageArtifactEdit(artifactId) {
    return this.router.push({
      name: "page-artifact-edit",
      params: { artifactId },
    });
  }

  install(app) {
    this.router.install(app);
    app.provide(key, this);
  }
}
