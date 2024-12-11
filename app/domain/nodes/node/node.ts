import type { Id } from "../ids";

import { createId, extractId } from "../ids";

export class Node {
  id: Id;
  name: string;
  parentId?: Id;

  constructor(name: string, parentId?: Id) {
    this.id = createId();
    this.name = name;
    this.parentId = parentId;
  }

  childrenOf(parentOrId: Id | Node): boolean {
    const id = extractId(parentOrId);
    return this.parentId === id;
  }

  root(): boolean {
    return !this.parentId;
  }
}
