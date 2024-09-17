import { type Artifact } from "@data/artifacts";
import { type Reactive } from "vue";

export interface Store {
  readonly artifacts: Reactive<Map<string, Artifact>>;
  rootHandle?: FileSystemDirectoryHandle;
}