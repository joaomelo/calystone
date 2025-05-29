import type { Nodes, Tag } from "@/domain";

import { Tags, TodoArtifact } from "@/domain";
import { throwError } from "@/utils";

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

  getTagOrThrow(name: string): Tag {
    const tags = this.compute();
    const tag = tags.get(name);
    if (!tag) throwError("TAG_NOT_FOUND");
    return tag;
  }
}