import { type Artifact } from "@/domain/artifacts";
import { type Id, type Tree } from "@/lib";
import { type Id, treeify } from "@/lib";
import { type ComputedRef, type Reactive, type Ref } from "vue";
import { computed, reactive, ref } from "vue";


export interface Store {
  readonly artifacts: Reactive<Map<Id, Artifact>>;
  root: Ref<FileSystemDirectoryHandle | undefined>;
}

export function createStore(): Store {
  const artifacts = reactive(new Map<Id, Artifact>());
  return {
    artifacts,
    root: ref(),
  };
}