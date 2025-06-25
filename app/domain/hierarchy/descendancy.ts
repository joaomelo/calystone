import type { Directory } from "@/domain/directory";
import type { Node, NodeOrId } from "@/domain/node";
import type { Nodes } from "@/domain/nodes";

import { resolveChildren, resolveDescendants } from "./resolve-descendancy";

export class Descendancy {
  directory: Directory;
  nodes: Nodes;

  constructor(options: { directory: NodeOrId; nodes: Nodes }) {
    this.nodes = options.nodes;
    this.directory = this.nodes.getOrThrow(options.directory);
  }

  children(): Node[] {
    return resolveChildren({ directory: this.directory, nodes: this.nodes });
  }

  descendants(): Node[] {
    return resolveDescendants({ directory: this.directory, nodes: this.nodes });
  }

  hasChildren(): boolean {
    return this.children().length > 0;
  }

  isChild(maybeChild: Node): boolean {
    const children = this.children();
    if (children.length === 0) return false;
    return children.some(c => c.isEqualTo(maybeChild));
  }

  isDescendant(maybeDescendant: Node): boolean {
    const descendants = this.descendants();
    if (descendants.length === 0) return false;
    return descendants.some(d => d.isEqualTo(maybeDescendant));
  }
}