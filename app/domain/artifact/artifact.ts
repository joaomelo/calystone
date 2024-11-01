import type { Directory } from "@/domain/directory";
import type { Id } from "@/utils";

export interface Artifact {
  id: Id;
  name: string;
  parent?: Directory;
}
