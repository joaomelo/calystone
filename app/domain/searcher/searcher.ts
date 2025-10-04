import Fuse from "fuse.js";

import type { Node } from "@/domain/node";
import type { Nodes } from "@/domain/nodes";

import { options } from "./options";

export class Searcher {
  private readonly limit: number;
  private readonly options = options;
  private readonly nodes: Nodes;

  constructor({
    limit = 100,
    nodes
  }: {
    limit?: number,
    nodes: Nodes
  }) {
    this.limit = limit;
    this.nodes = nodes;
  }

  search(text: string): Node[] {
    if (!text.trim()) return [];
    const fuse = new Fuse(this.nodes.list(), this.options);
    const results = fuse.search(text, { limit: this.limit });
    return results.map(result => result.item);
  }

}
