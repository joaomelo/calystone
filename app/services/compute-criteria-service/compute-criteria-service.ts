import type { RetrieveNodesService } from "@/services/retrieve-nodes-service";

import { TodoArtifact } from "@/domain";

export class ComputeCriteriaService {
  private readonly retrieveNodesService: RetrieveNodesService;

  constructor(retrieveNodesService: RetrieveNodesService) {
    this.retrieveNodesService = retrieveNodesService;
  }

  labels() {
    const labels = new Set<string>();

    const feed = (todo: TodoArtifact) => {
      const criteria = todo.criteria();
      criteria.forEach(({ label }) => labels.add(label));
    };

    const nodes = this.retrieveNodesService.list();
    for (const node of nodes) {
      if (node instanceof TodoArtifact) {
        feed(node);
      }
    }

    return labels;
  }

  todosCriterioneddBy(label: string): TodoArtifact[] {
    const todos: TodoArtifact[] = [];
    const nodes = this.retrieveNodesService.list();

    for (const node of nodes) {
      if (!(node instanceof TodoArtifact)) continue;
      if (!node.hasCriterion(label)) continue;
      todos.push(node);
    }

    return todos;
  }
}