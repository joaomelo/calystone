import type { Tag } from "@/domain";
import type { RetrieveNodesService } from "@/services/retrieve-nodes-service";

import {
  Tags,
  TodoArtifact
} from "@/domain";
import { throwError } from "@/utils";

export class ComputeTagsService {
  private readonly retrieveNodesService: RetrieveNodesService;

  constructor(retrieveNodesService: RetrieveNodesService) {
    this.retrieveNodesService = retrieveNodesService;
  }

  compute(): Tags {
    const tags = new Tags();
    const nodes = this.retrieveNodesService.list();
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