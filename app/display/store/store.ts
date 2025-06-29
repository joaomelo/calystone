import type { ServicesPortolfio } from "@/services";
import type { App, Ref } from "vue";

import { ref } from "vue";

import type { AppData } from "./app-data";

import { key } from "./key";
import { useStore } from "./use";

export class Store {
  appData: AppData;
  connected: Ref<boolean>;
  services: ServicesPortolfio;

  constructor(options: { appData: AppData, services: ServicesPortolfio }) {
    const { appData, services } = options;

    this.appData = appData;
    this.services = services;

    this.connected = ref(false);
    services.connectSource.subscribe(({ status }) => {
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
