import type { Media } from "@/domain/media";
import type { Nodes } from "@/domain/nodes";
import type { App, InjectionKey, Ref } from "vue";

import { createNodes } from "@/domain/nodes";
import { inject, reactive, ref } from "vue";

const key: InjectionKey<Store> = Symbol("store");

export interface Store {
  install(app: App): void;
  media: Ref<Media | undefined>;
  nodes: Nodes;
}

export function createStore(): Store {
  return {
    install(app: App) {
      app.provide(key, this);
    },
    media: ref<Media>(),
    nodes: reactive(createNodes())
  };
}

export function useStore() {
  const maybeStore = inject(key);
  if (!maybeStore) {
    throw new Error("store was not provided during initialization");
  }
  return maybeStore;
}