import type { Nodes } from "@/domain";

import { Tags, TodoArtifact } from "@/domain";

export class ComputeTagsService {
  readonly nodes: Nodes;

  constructor(nodes: Nodes) {
    this.nodes = nodes;
  }

  compute(): Tags {
    const tags = new Tags();
    const nodes = this.nodes.list();
    for (const node of nodes) {
      if (node instanceof TodoArtifact) {
        tags.add(node);
      }
    }
    return tags;
  }
}