import type { Directory } from "@/domain/directory";
import type {
  Node,
  NodeOrId
} from "@/domain/node";
import type { Nodes } from "@/domain/nodes";

import { Ascendancy } from "./ascendancy";
import { Descendancy } from "./descendancy";

export class Hierarchy {
  private readonly _ascendancy: Ascendancy;
  private readonly _descendancy: Descendancy;

  constructor(nodes: Nodes) {
    this._ascendancy = new Ascendancy(nodes);
    this._descendancy = new Descendancy(nodes);
  }

  children(directoryOrId: NodeOrId) {
    return this._descendancy.children(directoryOrId);
  }

  descendants(directoryOrId: NodeOrId) {
    return this._descendancy.descendants(directoryOrId);
  }

  hasChildren(directoryOrId: NodeOrId) {
    return this._descendancy.hasChildren(directoryOrId);
  }

  isChild({
    child,
    parent
  }: {
    child: Node;
    parent: NodeOrId;
  }) {
    return this._descendancy.isChild({
      child,
      parent
    });
  }

  isDescendant({
    descendant,
    parent
  }: {
    descendant: Node;
    parent: NodeOrId;
  }) {
    return this._descendancy.isDescendant({
      descendant,
      parent
    });
  }

  compareByPath(a: NodeOrId, b: NodeOrId) {
    return this._ascendancy.compareByPath(a, b);
  }

  ascendants(nodeOrId: NodeOrId): Directory[] {
    return this._ascendancy.ascendants(nodeOrId);
  }

  isAscendant({
    ascendant,
    child
  }: {
    ascendant: Directory;
    child: NodeOrId;
  }) {
    return this._ascendancy.isAscendant({
      ascendant,
      child
    });
  }

  isParent({
    child,
    parent
  }: {
    child: NodeOrId;
    parent: Directory;
  }) {
    return this._ascendancy.isParent({
      child,
      parent
    });
  }

  parent(nodeOrId: NodeOrId) {
    return this._ascendancy.parent(nodeOrId);
  }

  path(nodeOrId: NodeOrId) {
    return this._ascendancy.path(nodeOrId);
  }
}