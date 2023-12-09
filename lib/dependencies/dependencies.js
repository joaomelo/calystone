import { key } from "./key";

export class Dependencies {
  data = {};

  constructor(dependencies = {}) {
    Object.entries(dependencies).forEach(([name, value]) => {
      this.provide(name, value);
    });
  }

  provide(name, value) {
    this.data[name] = value;
  }

  inject() {
    return this.data;
  }

  install(app) {
    app.provide(key, this);
  }
}
