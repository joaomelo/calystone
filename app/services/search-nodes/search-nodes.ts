import type { Nodes } from "@/domain";

import { TodoArtifact } from "@/domain";
import Fuse from "fuse.js";

export class SearchNodesService {
  private readonly fuseOptions = {
    ignoreLocation: true,
    includeScore: true,
    keys: [
      { name: "name", weight: 2 },
      { name: "content", weight: 1.5 },
      { name: "details", weight: 1.5 },
      {
        getFn: (obj: unknown): string[] => {
          if (!(obj instanceof TodoArtifact)) return [];
          return obj.tags();
        },
        name: "tags",
        weight: 1,
      },
      { name: "mime.type", weight: 0.5 },
      { name: "mime.media", weight: 0.5 },
    ],
    shouldSort: true,
    threshold: 0.3,
    useExtendedSearch: true,
  };
  private nodes: Nodes;

  constructor(nodes: Nodes) {
    this.nodes = nodes;
  }

  search(text: string) {
    if (!text.trim()) return [];
    const fuse = new Fuse(this.nodes.list(), this.fuseOptions);
    const results = fuse.search(text, { limit: 100 });
    return results.map(result => result.item);
  }
}