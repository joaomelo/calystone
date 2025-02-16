import type { Nodes } from "@/domain";
import type { NodesService } from "@/infra";
import type { Configuration } from "@/utils";
import type { App, ComputedRef } from "vue";

import { computed } from "vue";

import type { AppData } from "./app-data";

import { key } from "./key";
import { useStore } from "./use";

interface Options {
  configuration: Configuration;
  nodes: Nodes;
  nodesService: NodesService
  appData: AppData;
};

export class Store {
  appData: AppData;
  configuration: Configuration;
  connected: ComputedRef<boolean>;
  nodes: Nodes;
  nodesService: NodesService;

  constructor({ appData, configuration, nodes, nodesService }: Options) {
    this.configuration = configuration;
    this.nodes = nodes;
    this.connected = computed(() => this.nodes.hash.size > 0); // hash is manually set as a reactive property in the nodes class. been so, is the most appropriate property do check for connection status instead of the presence or not of a repository in the nodes instance.
    this.nodesService = nodesService;
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
