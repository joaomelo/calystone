import type { Node } from "@/domain";

import { TodoArtifact } from "@/domain";
import Fuse from "fuse.js";

export class Searcher {
  private readonly limit: number;
  private readonly options = {
    ignoreLocation: true,
    includeScore: true,
    keys: [
      {
        name: "name",
        weight: 2
      },
      {
        name: "content",
        weight: 1.5
      },
      {
        name: "details",
        weight: 1.5
      },
      {
        getFn: (obj: unknown): string[] => {
          if (!(obj instanceof TodoArtifact)) return [];
          return obj.tagger.labels();
        },
        name: "tags",
        weight: 1,
      },
      {
        name: "mime.type",
        weight: 0.5
      },
      {
        name: "mime.media",
        weight: 0.5
      },
    ],
    shouldSort: true,
    threshold: 0.3,
    useExtendedSearch: true,
  };

  constructor(limit = 100) {
    this.limit = limit;
  }

  search(options: {
    nodes: Node[];
    text: string,
  }) {
    if (!options.text.trim()) return [];
    const fuse = new Fuse(options.nodes, this.options);
    const results = fuse.search(options.text, { limit: this.limit });
    return results.map(result => result.item);
  }

}
