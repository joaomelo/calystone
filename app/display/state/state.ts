import type { Activity } from "@/display/activities";
import type { Ignore, Nodes } from "@/domain";
import type { App, ComputedRef, Ref } from "vue";
import type { Router } from "vue-router";

import { computed, ref } from "vue";

import { solveRouterActivity } from "../activities";
import { key } from "./key";
import { useState } from "./use";

export class State {
  activity: ComputedRef<Activity>;
  ignore: Ref<Ignore>;
  nodes: Ref<Nodes | undefined>;

  constructor({ ignore, router }: Options) {
    this.nodes = ref();
    this.ignore = ref(ignore);
    this.activity = computed(() => solveRouterActivity(router));
  }

  static use(): State {
    return useState();
  }

  install(app: App) {
    app.provide(key, this);
  }

  update(nodes?: Nodes) {
    this.nodes.value = nodes;
  }
}

interface Options {
  ignore: Ignore;
  router: Router
};