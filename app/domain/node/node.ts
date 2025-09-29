import { compareByString } from "@/utils";
import { reactive } from "vue";

import type { Id } from "../id";
import type { NodeOptions } from "./options";

type Activity = "busy" | "idle";

export abstract class Node {
  static compareByName(a: Node, b: Node): number {
    const compare = compareByString<Node>({ select: (node) => node.name });
    return compare(a, b);
  }

  activity: Activity = "idle";
  readonly id: Id;
  loaded = false;
  name: string;
  parentId?: Id;

  constructor({
    id,
    name,
    parentId
  }: NodeOptions) {
    this.id = id;
    this.name = name;
    this.parentId = parentId;

    // unfortunately placing this vue wrapper was the only way the ui was able to reactively respond to state changes of new nodes created in some services like create directory or create artifact.
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

  isEqualTo(node: Node): boolean {
    return this.id === node.id;
  }

  isLoaded(): boolean {
    return this.loaded;
  }

  isRoot(): boolean {
    return !this.parentId;
  }

  isUnloaded(): boolean {
    return !this.loaded;
  }

  load(): void {
    this.loaded = true;
  }

  unload(): void {
    this.loaded = false;
  }
}
