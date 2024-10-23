import { type Artifact } from "@/domain";
import { type Id, type Tree } from "@/lib";
import { type ComputedRef, type Reactive, type Ref } from "vue";

export interface Store {
  readonly artifacts: Reactive<Map<Id, Artifact>>;
  readonly artifactsTree: ComputedRef<Tree<Id, Artifact>>;
  root: Ref<FileSystemDirectoryHandle | undefined>;
}