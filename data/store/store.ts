import { type Artifact } from "@domain";
import { type Reactive } from "vue";

export interface Store {
  readonly artifacts: Reactive<Map<string, Artifact>>;
  rootHandle?: FileSystemDirectoryHandle;
}