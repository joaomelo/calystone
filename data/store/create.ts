import  { type Artifact } from "@domain";
import { type Id, treeify } from "@lib";
import { computed, reactive, ref } from "vue";

import { type Store } from "./store";

export function createStore(): Store {
  const artifacts = reactive(new Map<Id, Artifact>());
  const artifactsTree = computed(() => treeify(artifacts));

  return {
    artifacts,
    artifactsTree,
    root: ref(),
  };
}