import type { Activity } from "@/display/activities";
import type { Configuration, Nodes } from "@/domain";
import type { App, ComputedRef, Reactive } from "vue";
import type { Router } from "vue-router";

import { computed, reactive } from "vue";

import { solveRouterActivity } from "../activities";
import { key } from "./key";
import { useStore } from "./use";

interface Options {
  router: Router;
  configuration: Configuration;
};

export class Store {
  activity: ComputedRef<Activity>;
  configuration: Reactive<Configuration>;
  connected: ComputedRef<boolean>;
  nodes?: Reactive<Nodes>;

  constructor({ configuration, router }: Options) {
    this.activity = computed(() => solveRouterActivity(router));
    this.configuration = reactive(configuration);
    this.connected = computed(() => this.nodes !== undefined);
  }

  static use(): Store {
    const store = useStore();
    return store;
  }

  install(app: App) {
    app.provide(key, this);
  }
}
