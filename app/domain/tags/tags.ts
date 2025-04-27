import type { Nodes } from "@/domain/nodes";

import { TodoArtifact } from "../artifact/todo";

export class Tags {
  nodes: Nodes;

  constructor(nodes: Nodes) {
    this.nodes = nodes;
  }

  list(): string[] {
    const listOfAllTags = new Set<string>();
    const feed = (tags: string[]) => { tags.forEach(tag => listOfAllTags.add(tag)); };

    const allNodes = this.nodes.list();
    for (const node of allNodes) {
      if (node instanceof TodoArtifact) {
        feed(node.tagger.list());
      }
    }

    return Array.from(listOfAllTags);
  }
}