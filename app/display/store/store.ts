import type { Activity } from "@/display/activities";
import type { Ignore, Nodes } from "@/domain";
import type { App, Reactive } from "vue";
import type { Router } from "vue-router";

import { computed, reactive } from "vue";

import { solveRouterActivity } from "../activities";
import { key } from "./key";
import { useStore } from "./use";

export class Store {
  state: State;

  constructor({ ignore, nodes, router }: Options) {
    this.state = reactive({
      activity: computed(() => solveRouterActivity(router)),
      connected: computed(( ) => !!nodes.repository),
      ignore,
      nodes: nodes
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

type State = Reactive<{
  activity: Activity;
  connected: boolean;
  ignore: Ignore;
  nodes: Nodes
}>;

interface Options {
  ignore: Ignore;
  router: Router
  nodes: Nodes
};
