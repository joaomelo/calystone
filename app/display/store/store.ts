import type { SourcesService } from "@/services";
import type { App, ComputedRef } from "vue";

import { computed, reactive } from "vue";

import type { AppData } from "./app-data";

import { key } from "./key";
import { useStore } from "./use";

interface Options {
  service: SourcesService
  appData: AppData;
};

export class Store {
  appData: AppData;
  connected: ComputedRef<boolean>;
  service: SourcesService;

  constructor({ appData, service }: Options) {
    this.service = reactive(service);
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
