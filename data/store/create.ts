import  { type Artifact } from "@data/artifacts";
import { reactive } from "vue";

import { type Store } from "./store";

export function createStore(): Store {
  return {
    artifacts: reactive(new Map<string, Artifact>()),
    rootHandle: undefined
  };
}