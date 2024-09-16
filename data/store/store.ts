import { type Entry } from "@data/file-system";
import { type Reactive } from "vue";

export interface Store {
  readonly entries: Reactive<Map<string, Entry>>;
  rootHandle?: FileSystemDirectoryHandle;
}