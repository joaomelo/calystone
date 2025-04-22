import type { Directory } from "@/domain/directory";
import type { Nodes } from "@/domain/nodes";

import { Status } from "@/utils";
import { throwError } from "@/utils";
import { reactive } from "vue";

import type { Id } from "../id";
import type { NodeOptions } from "./options";

type Activity = "busy" | "idle";

export abstract class Node {
  activity: Activity = "idle";
  readonly id: Id;
  loaded = false;
  name: string;
  readonly nodes: Nodes;
  parentId?: Id;

  constructor({ id, name, nodes, parentId }: NodeOptions) {
    this.id = id;
    this.name = name;
    this.parentId = parentId;
    this.nodes = nodes;

    // unfortunately placing this vue wrapper was the only way the ui was able to reactively react to state changes of new nodes created in some services like create directory or create artifact.
    return reactive(this);
  }

  busy(): void {
    this.activity = "busy";
  }

  idle(): void {
    this.activity = "idle";
  }

  isBusy(): boolean {
    return this.activity === "busy";
  }

  isChildOf(parent: Directory): boolean {
    return this.parentId === parent.id;
  }

  isDescendantOf(ascendant: Directory): boolean {
    let isDescendant = false;
    let parent = this.parent();
    while (parent) {
      if (parent.isEqualTo(ascendant)) {
        isDescendant = true;
        break;
      }
      parent = parent.parent();
    }
    return isDescendant;
  }

  isEqualTo(node: Node): boolean {
    return this.id === node.id;
  }

  isLoaded(): boolean {
    return this.loaded;
  }

  isRoot(): boolean {
    return !this.parentId;
  }

  load(): void {
    this.loaded = true;
  }

  mountPath(): string {
    const basePath = `/${this.name}`;
    const parent = this.parent();
    if (!parent) return basePath;
    return `${parent.mountPath()}${basePath}`;
  }

  move(targetParent: Directory): void {
    const moveable = this.moveable(targetParent);
    if (moveable.isFail()) throwError(moveable.cause);
    this.parentId = targetParent.id;
  }

  moveable(targetParent: Directory): Status {
    if (this.isRoot()) return Status.fail("CANNOT_MOVE_ROOT");
    if (this.isEqualTo(targetParent)) return Status.fail("CANNOT_MOVE_TO_ITSELF");
    if (this.isChildOf(targetParent)) return Status.fail("CANNOT_MOVE_TO_SAME_PARENT");

    if (isDirectoryWithoutCircularDependency(this) && targetParent.isDescendantOf(this)) return Status.fail("CANNOT_MOVE_TO_DESCENDANT");
    return Status.ok();
  }

  parent(): Directory | undefined {
    if (!this.parentId) return;
    const maybeParent = this.nodes.get(this.parentId);
    if (isDirectoryWithoutCircularDependency(maybeParent)) return maybeParent;
  }

  unload(): void {
    this.loaded = false;
  }
}

function isDirectoryWithoutCircularDependency(node?: Node): node is Directory {
  if (!node) return false;
  return "children" in node;
}
