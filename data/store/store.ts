import { type Artifact } from "@domain";
import { type Reactive, type Ref } from "vue";

export interface Store {
  readonly artifacts: Reactive<Map<string, Artifact>>;
  root: Ref<FileSystemDirectoryHandle | undefined>;
}