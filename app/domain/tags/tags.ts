import type { Nodes } from "@/domain/nodes";

import { TodoArtifact } from "../artifact/todo";
import { Tag } from "./tag";

export class Tags {
  nodes: Nodes;

  constructor(nodes: Nodes) {
    this.nodes = nodes;
  }

  list(): Tag[] {
    const hash = new Map<string, Tag>();

    const nodes = this.nodes.list();
    for (const node of nodes) {
      if (node instanceof TodoArtifact) {
        const names = node.tagger.list();
        for (const name of names) {
          const tag = hash.get(name);
          if (tag) {
            tag.add(node);
          } else {
            const tag = new Tag(name);
            hash.set(name, tag);
            tag.add(node);
          }
        }
      }
    }
    return Array.from(hash.values());
  }
}