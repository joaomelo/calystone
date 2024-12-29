import { Node } from "../node";

export class Directory extends Node {

  children(): Node[] {
    return this.nodes.list().filter(node => node.childrenOf(this));
  }

  descendants(): Node[] {
    return this.nodes.list().filter(node => node.descendantOf(this));
  }

  async performLoad(): Promise<void> {
    await this.repository.openDirectory(this.id);
  }
};
