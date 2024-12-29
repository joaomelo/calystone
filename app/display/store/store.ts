import type { Activity } from "@/display/activities";
import type { Nodes } from "@/domain";
import type { App, Reactive } from "vue";
import type { Router } from "vue-router";

import { computed, reactive } from "vue";

import { solveRouterActivity } from "../activities";
import { key } from "./key";
import { useStore } from "./use";

type State = Reactive<{
  activity: Activity;
  nodes: Nodes
}>;

interface Options {
  router: Router
  nodes: Nodes
};

export class Store {
  state: State;

  constructor({ nodes, router }: Options) {
    this.state = reactive({
      activity: computed(() => solveRouterActivity(router)),
      nodes
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
