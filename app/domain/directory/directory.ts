import { createNode } from "@/domain/factory";

import { Node } from "../node";

export class Directory extends Node {

  protected async performLoad(): Promise<void> {
    const repository = this.nodes.repositoryOrThrow();
    const nodesData = await repository.openDirectory(this.id);
    for (const data of nodesData) {
      const node = createNode({ ...data, nodes: this.nodes });
      this.nodes.set(node);
    }
  }

  children(): Node[] {
    return this.nodes.list().filter(node => node.childrenOf(this));
  }

  descendants(): Node[] {
    return this.nodes.list().filter(node => node.descendantOf(this));
  }
};
