import type { RetrieveNodesService } from "@/services/retrieve-nodes-service";

import {
  Tagger,
  TodoArtifact
} from "@/domain";

export class ComputeTagsService {
  private readonly retrieveNodesService: RetrieveNodesService;

  constructor(retrieveNodesService: RetrieveNodesService) {
    this.retrieveNodesService = retrieveNodesService;
  }

  compute(): Tagger {
    let tagger = new Tagger();
    const nodes = this.retrieveNodesService.list();
    for (const node of nodes) {
      if (node instanceof TodoArtifact) {
        tagger = tagger.combine(node.tagger);
      }
    }
    return tagger;
  }
}