import type {
  Directory, Node, NodeOrId
} from "@/domain";
import type { ConnectSourceService } from "@/services/connect-source-service";

import {
  Ascendancy, Descendancy
} from "@/domain";

export class QueryHierarchyService {
  private readonly connectSourceService: ConnectSourceService;

  constructor(connectSourceService: ConnectSourceService) {
    this.connectSourceService = connectSourceService;
  }

  ascendants(nodeOrId: NodeOrId): Directory[] {
    return this.ascendancy().ascendants(nodeOrId);
  }

  children(directoryOrId: NodeOrId): Node[] {
    return this.descendancy().children(directoryOrId);
  }

  descendants(directoryOrId: NodeOrId): Node[] {
    return this.descendancy().descendants(directoryOrId);
  }

  hasChildren(directoryOrId: NodeOrId): boolean {
    return this.descendancy().hasChildren(directoryOrId);
  }

  isAscendant(options: {
    ascendant: Directory;
    child: NodeOrId
  }): boolean {
    return this.ascendancy().isAscendant(options);
  }

  isChild(options: {
    child: Node;
    parent: NodeOrId
  }): boolean {
    return this.descendancy().isChild(options);
  }

  isDescendant(options: {
    descendant: Node;
    parent: NodeOrId
  }): boolean {
    return this.descendancy().isDescendant(options);
  }

  isParent(options: {
    child: NodeOrId;
    parent: Directory
  }): boolean {
    return this.ascendancy().isParent(options);
  }

  parent(nodeOrId: NodeOrId): Directory | undefined {
    return this.ascendancy().parent(nodeOrId);
  }

  path(nodeOrId: NodeOrId): string {
    return this.ascendancy().path(nodeOrId);
  }

  private ascendancy(): Ascendancy {
    const { nodes } = this.connectSourceService.stateConnectedOrThrow();
    return new Ascendancy(nodes);
  }

  private descendancy(): Descendancy {
    const { nodes } = this.connectSourceService.stateConnectedOrThrow();
    return new Descendancy(nodes);
  }
}