import type { Directory } from "@/domain/directory";
import type { Node, NodeOrId } from "@/domain/node";
import type { Nodes } from "@/domain/nodes";

import { resolveParent } from "./resolve-parent";

export class Ascendancy {
  node: Node;
  nodes: Nodes;

  constructor(options: { node: NodeOrId; nodes: Nodes }) {
    this.nodes = options.nodes;
    this.node = this.nodes.getOrThrow(options.node);
  }

  ascendants(): Directory[] {
    const node = this.nodes.get(this.node);
    if (!node) return [];

    const ascendants: Directory[] = [];

    let parent = resolveParent({ node: this.node, nodes: this.nodes });
    while (parent) {
      ascendants.push(parent);
      parent = resolveParent({ node: parent, nodes: this.nodes });
    }

    return ascendants;
  }

  isAscendant(maybeAscendant: Directory): boolean {
    const ascendants = this.ascendants();
    if (ascendants.length === 0) return false;
    return ascendants.some(a => a.isEqualTo(maybeAscendant));
  }

  isParent(maybeParent: Directory): boolean {
    const realParent = this.parent();
    if (!realParent) return false;
    return realParent.isEqualTo(maybeParent);
  }

  parent(): Directory | undefined {
    return resolveParent({ node: this.node, nodes: this.nodes });
  }

  path(): string {
    const ascendants = this.ascendants();
    const ascendantsPlusNode = ascendants.toReversed().concat(this.node);
    return ascendantsPlusNode.map(a => `/${a.name}`).join("");
  }
}