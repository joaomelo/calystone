import type { Nodes } from "@/domain/nodes";

import { Status } from "@/utils";
import { throwError } from "@/utils";

import type { Id } from "../id";
import type { NodeOptions } from "./options";

type Activity = "busy" | "idle";
type Load = "loaded" | "unloaded";

export abstract class Node {
  activity: Activity = "idle";
  readonly id: Id;
  load: Load = "unloaded";
  name: string;
  readonly nodes: Nodes;
  parentId?: Id;

  constructor({ id, name, nodes, parentId }: NodeOptions) {
    this.id = id;
    this.name = name;
    this.parentId = parentId;
    this.nodes = nodes;
  }

  busy(): void {
    this.activity = "busy";
  }

  getParent(): Node | undefined {
    if (!this.parentId) return;
    return this.nodes.get(this.parentId);
  }

  idle(): void {
    this.activity = "idle";
  }

  isBusy(): boolean {
    return this.activity === "busy";
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

  isLoaded(): boolean {
    return this.load === "loaded";
  }

  isRoot(): boolean {
    return !this.parentId;
  }

  loaded(): void {
    this.load = "loaded";
  }

  mountPath(): string {
    const basePath = `/${this.name}`;
    const parent = this.getParent();
    if (!parent) return basePath;
    return `${parent.mountPath()}${basePath}`;
  }

  move(target: Node): void {
    const moveable = this.moveable(target);
    if (moveable.isFail()) throwError(moveable.cause);
    this.parentId = target.id;
  }

  moveable(target: Node): Status {
    const parentable = target.parentable();
    if (parentable.isFail()) return parentable;
    if (this.isRoot()) return Status.fail("CANNOT_MOVE_ROOT");
    if (this.isEqualTo(target)) return Status.fail("CANNOT_MOVE_TO_ITSELF");
    if (this.isChildOf(target)) return Status.fail("CANNOT_MOVE_TO_SAME_PARENT");
    if (target.isDescendantOf(this)) return Status.fail("CANNOT_MOVE_TO_DESCENDANT");
    return Status.ok();
  }

  abstract parentable(): Status;

  unloaded(): void {
    this.load = "unloaded";
  }
}
