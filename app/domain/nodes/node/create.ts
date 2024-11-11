import type { Id } from "@/utils";

import { createId } from "@/utils";

import type { Node } from "./node";

export function createNode(name: string, parentId? : Id) {
  const node: Node = {
    id: createId(),
    name,
    parentId,
  };
  return node;
}