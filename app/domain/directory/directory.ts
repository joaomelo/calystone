import { Node } from "../node";

export class Directory extends Node {

  getChildren(): Node[] {
    return this.nodes.list().filter(node => node.isChildOf(this));
  }

  getDescendants(): Node[] {
    return this.nodes.list().filter(node => node.isDescendantOf(this));
  }

};
