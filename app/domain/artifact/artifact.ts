import type { Id } from "@/utils";

export interface Artifact {
  id: Id;
  name: string;
  parentId?: Id;
}
