import type { Criterion } from "@/domain";
import type { SpawnCollectionsService } from "@/services/spawn-collections-service";

import { TodoArtifact } from "@/domain";
import { compareByString } from "@/utils";

export class QueryCriteriaService {
  private readonly spawnCollectionsService: SpawnCollectionsService;

  constructor(spawnCollectionsService: SpawnCollectionsService) {
    this.spawnCollectionsService = spawnCollectionsService;
  }

  labels() {
    const labelsSet = new Set<string>();

    const feed = (todo: TodoArtifact) => {
      const { criteria } = todo;
      criteria.forEach(({ label }) => labelsSet.add(label));
    };

    const nodes = this.spawnCollectionsService.list();
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