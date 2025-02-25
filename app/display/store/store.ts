import type { ServicesPortolfio } from "@/services";
import type { App, ComputedRef } from "vue";

import { computed } from "vue";

import type { AppData } from "./app-data";

import { key } from "./key";
import { useStore } from "./use";

interface Options {
  service: ServicesPortolfio
  appData: AppData;
};

export class Store {
  appData: AppData;
  connected: ComputedRef<boolean>;
  service: ServicesPortolfio;

  constructor({ appData, service }: Options) {
    this.service = service;
    this.connected = computed(() => false);
    this.appData = appData;
  }

  static use(): Store {
    const store = useStore();
    return store;
  }

  install(app: App) {
    app.provide(key, this);
  }
}
