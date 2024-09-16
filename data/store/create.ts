import  { type Entry } from "@data/file-system";
import { reactive } from "vue";

import { type Store } from "./store";

export function createStore(): Store {
  return {
    entries: reactive(new Map<string, Entry>()),
    rootHandle: undefined
  };
}