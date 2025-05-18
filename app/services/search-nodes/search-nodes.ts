import type { Node, Nodes } from "@/domain";

import Fuse from "fuse.js";

export class SearchNodesService {
  private readonly fuseOptions = {
    ignoreLocation: true,
    includeScore: true,
    keys: ["name"],
    shouldSort: true,
    threshold: 0.3,
    useExtendedSearch: true
  };
  private nodes: Nodes;

  constructor(nodes: Nodes) {
    this.nodes = nodes;
  }

  search(options: { limit?: number; text: string, }): Node[] {
    const { limit = 100, text } = options;

    if (!text.trim()) {
      return [];
    }

    const fuse = new Fuse(this.nodes.list(), this.fuseOptions);
    const results = fuse.search(text);

    return results.map(result => result.item).slice(0, limit);
  }
}