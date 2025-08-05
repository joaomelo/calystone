import type { ServicesPortfolio } from "@/services";
import type {
  App,
  Ref
} from "vue";

import { ref } from "vue";

import type { AppData } from "./app-data";

import { key } from "./key";
import { useStore } from "./use";

export class Store {
  appData: AppData;
  connected: Ref<boolean>;
  enablePriorityPage: boolean;
  services: ServicesPortfolio;

  constructor({
    appData,
    enablePriorityPage,
    services
  }: {
    appData: AppData,
    enablePriorityPage: boolean,
    services: ServicesPortfolio,
  }) {
    this.appData = appData;
    this.enablePriorityPage = enablePriorityPage;
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
