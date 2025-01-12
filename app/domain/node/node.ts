import { throwError } from "@/utils";
import { reactive } from "vue";

import type { Directory } from "../directory";
import type { Id } from "../id";
import type { Nodes } from "../nodes";
import type { NodeOptions } from "./data";
import type { Status } from "./status";

import { descendantOf } from "./descendants";
import { path } from "./path";

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
    return reactive(this);
  }

  childrenOf(maybeParent: Directory): boolean {
    return this.parentId === maybeParent.id;
  }

  descendantOf(maybeAscendant: Directory): boolean {
    return descendantOf(this, maybeAscendant);
  }

  equal(node: Node): boolean {
    return this.id === node.id;
  }

  async load(): Promise<void> {
    // this allows unexpensive calls to load without worring about costly reloads or breaking the state. if needed, a explicit reload logic has to be added.
    if (this.status !== "unloaded") return;

    this.status = "loading";

    try {
      await this.performLoad();
    } catch (error) {
      this.status = "unloaded";
      throwError("CANNOT_LOAD", error);
    }

    this.status = "loaded";
  }

  parent(): Node | undefined {
    if (!this.parentId) return;
    return this.nodes.getOrThrow(this.parentId);
  }

  path(): string {
    return path(this);
  }

  abstract performLoad(): Promise<void>;

  root(): boolean {
    return !this.parentId;
  }
}
