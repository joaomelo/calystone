import type { Id } from "@/domain/id";
import type { Node, NodeOrId } from "@/domain/node";

import { Directory } from "@/domain/directory/directory";
import { Descendancy } from "@/domain/hierarchy";
import { isId } from "@/domain/id";
import { Status, throwCritical } from "@/utils";
import { reactive } from "vue";

export class Nodes {
  descendancy: Descendancy;
  map: Map<Id, Node>;

  constructor() {
    this.descendancy = new Descendancy(this);

    // unfortunately placing this vue wrapper was the only way the ui was able to reactively update nodes updates like opening a directory. if trying to make the internal map reactive in the display store level was not enough to make vue able to detect the nodes data updates.
    this.map = reactive(new Map());
  }

  clear(): void {
    this.map.clear();
  }

  get(nodeOrId: NodeOrId): Node | undefined {
    const id = isId(nodeOrId) ? nodeOrId : nodeOrId.id;
    return this.map.get(id);
  }

  getOrThrow(nodeOrId: NodeOrId): Node {
    const node = this.get(nodeOrId);
    if (!node) throwCritical("NODE_NOT_FOUND");
    return node;
  }

  has(nodeOrId: NodeOrId): boolean {
    const id = isId(nodeOrId) ? nodeOrId : nodeOrId.id;
    return this.map.has(id);
  }

  list(): Node[] {
    return Array.from(this.map.values());
  }

  move(options: { subject: Node; target: Directory }): void {
    const moveable = this.moveable(options);
    moveable.throwOnFail();
    options.subject.parentId = options.target.id;
  }

  moveable(options: { subject: Node; target: Directory }): Status {
    const { subject, target } = options;

    if (subject.isRoot()) return Status.fail("CANNOT_MOVE_ROOT");
    if (subject.isEqualTo(target)) return Status.fail("CANNOT_MOVE_TO_ITSELF");

    if (this.descendancy.isChild({ child: subject, parent: target })) return Status.fail("CANNOT_MOVE_TO_SAME_PARENT");

    if (!(subject instanceof Directory)) return Status.ok();

    if (this.descendancy.isDescendant({ descendant: target, parent: subject })) return Status.fail("CANNOT_MOVE_TO_DESCENDANT");

    return Status.ok();
  }

  remove(node: Node) {
    this.map.delete(node.id);
    if (!(node instanceof Directory)) return;

    for (const child of this.descendancy.descendants(node)) {
      this.map.delete(child.id);
    }
  }

  set(node: Node): void {
    this.map.set(node.id, node);
  }

  size() {
    return this.map.size;
  }
}
