import type { Nodes } from "@/domain";
import type { ServicesPortolfio } from "@/services";
import type { App, Ref } from "vue";

import { reactive, ref } from "vue";

import type { AppData } from "./app-data";

import { key } from "./key";
import { useStore } from "./use";

interface Options {
  services: ServicesPortolfio
  appData: AppData;
};

export class Store {
  appData: AppData;
  connected: Ref<boolean>;
  nodes: Nodes;
  services: ServicesPortolfio;

  constructor({ appData, services }: Options) {
    this.appData = appData;
    this.services = services;
    this.nodes = reactive(services.nodes);

    this.connected = ref(false);
    this.services.connectSource.subscribe(({ status }) => {
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
