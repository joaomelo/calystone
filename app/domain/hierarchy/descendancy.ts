import type { Node, NodeOrId } from "@/domain/node";
import type { Nodes } from "@/domain/nodes";

import { Directory } from "@/domain/directory";

export class Descendancy {
  nodes: Nodes;

  constructor(nodes: Nodes) {
    this.nodes = nodes;
  }

  children(directoryOrId: NodeOrId): Node[] {
    const directory = this.nodes.getOrThrow(directoryOrId);
    if (!(directory instanceof Directory)) return [];
    const children = this.nodes.list().filter(node => node.parentId === directory.id);
    return children;
  }

  descendants(directoryOrId: NodeOrId): Node[] {
    const children = this.children(directoryOrId);
    return children.flatMap(child => this.descendants(child));
  }

  hasChildren(directoryOrId: NodeOrId): boolean {
    return this.children(directoryOrId).length > 0;
  }

  isChild({
    child,
    parent
  }: {
    child: Node;
    parent: NodeOrId;
  }): boolean {
    const children = this.children(parent);
    if (children.length === 0) return false;
    return children.some(c => c.isEqualTo(child));
  }

  isDescendant({
    descendant,
    parent
  }: {
    descendant: Node;
    parent: NodeOrId;
  }): boolean {
    const descendants = this.descendants(parent);
    if (descendants.length === 0) return false;
    return descendants.some(d => d.isEqualTo(descendant));
  }
}