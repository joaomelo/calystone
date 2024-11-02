import type { Artifacts, Source } from "@/domain";
import type { App, InjectionKey } from "vue";

import { createArtifacts, createSource } from "@/domain";
import { inject, reactive } from "vue";

const key: InjectionKey<Store> = Symbol("store");

export interface Store {
  artifacts: Artifacts;
  install(app: App): void;
  source: Source;
}

export function createStore(): Store {
  return {
    artifacts: reactive(createArtifacts()),
    install(app: App) {
      app.provide(key, this);
    },
    source: reactive(createSource())
  };
}

export function useStore() {
  const maybeStore = inject(key);
  if (!maybeStore) {
    throw new Error("store was not provided during initialization");
  }
  return maybeStore;
}