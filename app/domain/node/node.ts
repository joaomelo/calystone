import type { Nodes } from "@/domain/nodes";

import type { Id } from "../id";
import type { NodeOptions } from "./options";
import type { Status } from "./status";

export abstract class Node {
  readonly id: Id;
  readonly name: string;
  readonly nodes: Nodes;
  readonly parentId?: Id;
  status: Status = "unloaded";

  constructor({ id, name, nodes, parentId }: NodeOptions) {
    this.id = id;
    this.name = name;
    this.parentId = parentId;
    this.nodes = nodes;
  }

  getParent(): Node | undefined {
    if (!this.parentId) return;
    return this.nodes.get(this.parentId);
  }

  isChildOf(parent: Node): boolean {
    return this.parentId === parent.id;
  }

  isDescendantOf(ascendant: Node): boolean {
    let isDescendant = false;
    let parent = this.getParent();
    while (parent) {
      if (parent.isEqualTo(ascendant)) {
        isDescendant = true;
        break;
      }
      parent = parent.getParent();
    }
    return isDescendant;
  }

  isEqualTo(node: Node): boolean {
    return this.id === node.id;
  }

  isRoot(): boolean {
    return !this.parentId;
  }

  mountPath(): string {
    const basePath = `/${this.name}`;
    const parent = this.getParent();
    if (!parent) return basePath;
    return `${parent.mountPath()}${basePath}`;
  }
}
