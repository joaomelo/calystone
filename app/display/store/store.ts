import type { Nodes } from "@/domain";
import type { ServicesPortolfio } from "@/services";
import type { App, Ref } from "vue";

import { reactive, ref } from "vue";

import type { AppData } from "./app-data";

import { key } from "./key";
import { useStore } from "./use";

interface Options {
  service: ServicesPortolfio
  appData: AppData;
};

export class Store {
  appData: AppData;
  connected: Ref<boolean>;
  nodes: Nodes;
  service: ServicesPortolfio;

  constructor({ appData, service }: Options) {
    this.appData = appData;
    this.service = service;
    this.nodes = reactive(service.nodes);

    this.connected = ref(false);
    this.service.connection.status.subscribe(status => {
      this.connected.value = status === "connected";
    });
  }

  static use(): Store {
    const store = useStore();
    return store;
  }

  install(app: App) {
    app.provide(key, this);
  }
}
