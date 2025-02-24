import type { Nodes } from "@/domain";
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
  nodesSet: Set<Nodes>;
  service: SourcesService;

  constructor({ appData, service }: Options) {
    this.nodesSet = reactive(new Set());
    this.connected = computed(() => this.nodesSet.size > 0);
    this.service = service;
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
