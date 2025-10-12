import type { Id } from "@/domain/id";
import type { Node } from "@/domain/node";
import type { Status } from "@/utils";

import type { Nodes } from "./nodes";

import { Ascendancy } from "./ascendancy";
import { Creator } from "./creator";

export class Renamer {
  private readonly _creator: Creator;
  private readonly _nodes: Nodes;
  private readonly _ascendancy: Ascendancy;

  constructor(nodes: Nodes) {
    this._nodes = nodes;
    this._creator = new Creator(nodes);
    this._ascendancy = new Ascendancy(nodes);
  }

  rename({
    name,
    node
  }: {
    name: string;
    node: Node
  }): void {
    const renameable = this.renameable({
      name,
      nodeOrId: node
    });
    renameable.throwOnFail();
    node.name = name;
  }

  renameable({
    name,
    nodeOrId
  }: {
    name: string;
    nodeOrId: Id | Node;
  }): Status {
    const parent = this._ascendancy.parent(nodeOrId);
    const creatable = this._creator.creatable({
      name,
      parent
    });
    return creatable;
  }
}
