import type { Activity } from "@/display/activities";
import type { Configuration, Nodes } from "@/domain";
import type { App, Reactive } from "vue";
import type { Router } from "vue-router";

import { computed, reactive } from "vue";

import { solveRouterActivity } from "../activities";
import { key } from "./key";
import { useStore } from "./use";

type State = Reactive<{
  activity: Activity;
  configuration: Configuration;
  nodes: Nodes;
}>;

interface Options {
  router: Router;
  nodes: Nodes;
  configuration: Configuration;
};

export class Store {
  state: State;

  constructor({ configuration, nodes, router }: Options) {
    this.state = reactive({
      activity: computed(() => solveRouterActivity(router)),
      configuration,
      nodes,
    });
  }

  static use(): State {
    const store = useStore();
    return store.state;
  }

  install(app: App) {
    app.provide(key, this);
  }
}
