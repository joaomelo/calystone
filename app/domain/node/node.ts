import type { Id } from "@/utils";

export interface Node {
  id: Id;
  name: string;
  parentId?: Id;
}
