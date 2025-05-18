import type { Nodes } from "@/domain";

export class SearchNodesService {
  private nodes: Nodes;

  constructor(nodes: Nodes) {
    this.nodes = nodes;
  }

  search(text: string) {
    const neutralizedText = text.toLowerCase().trim();
    const results = this.nodes.list().filter(node => node.name.toLowerCase().includes(neutralizedText));
    return results;
  }
}