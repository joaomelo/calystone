import  { type Artifact } from "@domain";
import { reactive, ref } from "vue";

import { type Store } from "./store";

export function createStore(): Store {
  return {
    artifacts: reactive(new Map<string, Artifact>()),
    root: ref(),
  };
}