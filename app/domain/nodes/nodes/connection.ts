import type { Node } from "@/domain/nodes/node";
import type { Nodes } from "@/domain/nodes/nodes";

export abstract class NodesConnection {
  nodes: Nodes;

  constructor(nodes: Nodes) {
    this.nodes = nodes;
  }

  abstract load(): AsyncGenerator<Node>;
}