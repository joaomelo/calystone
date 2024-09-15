import type { App } from "vue";

import { type Source } from "@data/sources";

import { installStore } from "./plugin";

export class Store {
  private source: null | Source = null;

  defineSource(source: Source) {
    this.source = source;
  }

  install(app: App) {
    installStore(this, app);
  }

  retrieveSource() {
    if (this.source === null) {
      throw new Error("Source is not defined");
    }
    return this.source;
  }
}