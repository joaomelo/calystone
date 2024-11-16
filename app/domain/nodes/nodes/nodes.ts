import type { Id } from "@/utils";

import type { Directory } from "../directory";
import type { Node } from "../node";

import { children } from "./children";
import { descendants } from "./descendants";
import { getOrThrow } from "./get";
import { path } from "./path";

export class Nodes extends Map<Id, Node> {
  children(parentOrId: Directory | Id): Node[] {
    return children(this.list(), parentOrId);
  }

  descendants(parentOrId: Directory | Id): Node[] {
    return descendants(this.list(), parentOrId);
  }

  getOrThrow(id: Id) {
    return getOrThrow(this, id);
  }

  list() {
    return Array.from(this.values());
  }

  path(nodeOrId: Id | Node): string {
    return path(this, nodeOrId);
  }
}
