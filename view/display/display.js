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

  is(name) {
    return this.router.currentRoute.value.name === name;
  }

  pageSolve() {
    return this.router.push({ name: "page-solve" });
  }

  pageAuth() {
    return this.router.push({ name: "page-auth" });
  }

  pageStart() {
    const route = this.router.resolve(this.start);
    return route.meta.intra ? this.router.push(route) : this.pageOutline();
  }

  pageOutline() {
    return this.router.push({ name: "page-outline" });
  }

  pagePreferences() {
    return this.router.push({ name: "page-preferences" });
  }

  pageSearch() {
    return this.router.push({ name: "page-search" });
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
