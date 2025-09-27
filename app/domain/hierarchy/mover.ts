import type { Node } from "@/domain/node";
import type { Nodes } from "@/domain/nodes";

import { Directory } from "@/domain/directory/directory";
import { Status } from "@/utils";

import { Descendancy } from "./descendancy";

export class Mover {
  private readonly _descendancy: Descendancy;
  private readonly _nodes: Nodes;

  constructor(nodes: Nodes) {
    this._nodes = nodes;
    this._descendancy = new Descendancy(nodes);
  }

  move(options: {
    subject: Node;
    target: Directory
  }): void {
    const moveable = this.moveable(options);
    moveable.throwOnFail();
    options.subject.parentId = options.target.id;
  }

  moveable(options: {
    subject: Node;
    target: Directory
  }): Status {
    const {
      subject,
      target
    } = options;

    if (subject.isRoot()) return Status.fail("CANNOT_MOVE_ROOT");
    if (subject.isEqualTo(target)) return Status.fail("CANNOT_MOVE_TO_ITSELF");

    if (this._descendancy.isChild({
      child: subject,
      parent: target
    })) return Status.fail("CANNOT_MOVE_TO_SAME_PARENT");

    if (!(subject instanceof Directory)) return Status.ok();

    if (this._descendancy.isDescendant({
      descendant: target,
      parent: subject
    })) return Status.fail("CANNOT_MOVE_TO_DESCENDANT");

    return Status.ok();
  }

  clear(directory: Directory): void {
    const descendants = this._descendancy.descendants(directory);
    for (const descendant of descendants) {
      this._nodes.delete(descendant.id);
    }
  }

  remove(node: Node) {
    this.clear(node);
    this._nodes.delete(node.id);
  }
}
