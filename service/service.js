import { inject } from "vue";
import { Db } from "./db";

const key = "service";

export class Service {
  db;

  constructor(options) {
    this.db = new Db(options);
  }

  install(app) {
    app.provide(key, this);
  }
}

export function useService() {
  return inject(key);
}
