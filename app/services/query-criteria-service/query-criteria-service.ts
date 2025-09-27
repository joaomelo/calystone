import type { Criterion } from "@/domain";
import type { RetrieveNodesService } from "@/services/retrieve-nodes-service";

import { TodoArtifact } from "@/domain";
import { compareByString } from "@/utils";

export class QueryCriteriaService {
  private readonly retrieveNodesService: RetrieveNodesService;

  constructor(retrieveNodesService: RetrieveNodesService) {
    this.retrieveNodesService = retrieveNodesService;
  }

  labels() {
    const labelsSet = new Set<string>();

    const feed = (todo: TodoArtifact) => {
      const { criteria } = todo;
      criteria.forEach(({ label }) => labelsSet.add(label));
    };

    const nodes = this.retrieveNodesService.list();
    for (const node of nodes) {
      if (node instanceof TodoArtifact) {
        feed(node);
      }
    }

    const labelsList = Array.from(labelsSet);
    const compare = compareByString<string>({ select: label => label });

    return labelsList.sort(compare);
  }

  difference(other: Criterion[]): string[] {
    const allLabels = new Set(this.labels());
    const otherLabels = new Set(other.map(({ label }) => label));
    const difference = allLabels.difference(otherLabels);
    return Array.from(difference);
  }

}