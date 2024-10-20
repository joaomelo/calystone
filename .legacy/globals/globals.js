import { key } from "./key";

export class Globals {
  container = new Map();

  constructor(nameOrDependencies, maybeDependency) {
    this.provide(nameOrDependencies, maybeDependency);
  }

  clear() {
    this.container.clear();
  }

  inject(maybeName) {
    if (maybeName) {
      return this.container.get(maybeName);
    }
    else {
      const allDependencies = {};
      this.container.forEach((dependency, name) => allDependencies[name] = dependency);
      return allDependencies;
    }
  }

  install(app) {
    app.provide(key, this);
  }

  provide(nameOrDependencies, maybeDependency) {
    if (typeof nameOrDependencies === "object") {
      Object.entries(nameOrDependencies)
        .forEach(([name, dependency]) => this.container.set(name, dependency));
    }
    else {
      this.container.set(nameOrDependencies, maybeDependency);
    }
  }
}
