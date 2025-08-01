import type { NodeOrId } from "@/domain/node";
import type { Nodes } from "@/domain/nodes";

import { Directory } from "@/domain/directory";

export class Ascendancy {
  nodes: Nodes;

  constructor(nodes: Nodes) {
    this.nodes = nodes;
  }

  ascendants(nodeOrId: NodeOrId): Directory[] {
    const node = this.nodes.get(nodeOrId);
    if (!node) return [];

    const ascendants: Directory[] = [];
    let parent = this.parent(nodeOrId);
    while (parent) {
      ascendants.push(parent);
      parent = this.parent(parent);
    }

    return ascendants;
  }

  isAscendant({
    ascendant,
    child
  }: {
    ascendant: Directory;
    child: NodeOrId;
  }): boolean {
    const ascendants = this.ascendants(child);
    if (ascendants.length === 0) return false;
    return ascendants.some(a => a.isEqualTo(ascendant));
  }

  isParent({
    child,
    parent
  }: {
    child: NodeOrId;
    parent: Directory;
  }): boolean {
    const realParent = this.parent(child);
    if (!realParent) return false;
    return realParent.isEqualTo(parent);
  }

  parent(nodeOrId: NodeOrId): Directory | undefined {
    const node = this.nodes.get(nodeOrId);
    if (!node) return;
    if (!node.parentId) return;

    const parent = this.nodes.get(node.parentId);
    if (!parent) return;
    if (!(parent instanceof Directory)) return;

    return parent;
  }

  path(nodeOrId: NodeOrId): string {
    const node = this.nodes.getOrThrow(nodeOrId);
    const ascendants = this.ascendants(node);
    const ascendantsPlusNode = ascendants.toReversed().concat(node);
    return ascendantsPlusNode.map(a => `/${a.name}`).join("");
  }
}