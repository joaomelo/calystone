import type { ProviderKey } from "@/domain/state";

import { Storage } from "@/domain/state";
import { Store, useStore } from "@/domain/state";
import { ref, watch } from "vue";

import { asIgnore } from "./ignore";
import { Nodes } from "./nodes";

const providerKey: ProviderKey<Nodes> = Symbol("nodes");
const storageKey = "nodes";

export class NodesStore extends Store<Nodes> {

  constructor() {
    const ignoreStorage = new Storage(storageKey, asIgnore);
    const ignore = ignoreStorage.load();
    const nodes = ref(new Nodes(ignore));
    watch(
      () => nodes.value.ignore,
      (value) => {
        ignoreStorage.save(value);
      }
    );

    super(providerKey, nodes);
  }
}

export function useNodes() {
  return useStore(providerKey);
}