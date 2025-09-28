import type { Nodes } from "@/domain/nodes";

import {
  Tagger,
  TodoArtifact
} from "@/domain/artifact";

export class Todos {
  private readonly nodes: Nodes;

  constructor(nodes: Nodes) {
    this.nodes = nodes;
  }

  tagger() {
    const tagger = new Tagger();
    const nodes = this.nodes.list();
    for (const node of nodes) {
      if (node instanceof TodoArtifact) {
        tagger.add(node.tags);
      }
    }
    return tagger;
  }
}