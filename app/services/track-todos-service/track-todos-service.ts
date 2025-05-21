import type { Nodes } from "@/domain";

import { TodoArtifact } from "@/domain";
import { throwError } from "@/utils";

export class TrackTodosService {
  private readonly nodes: Nodes;

  constructor(nodes: Nodes) {
    this.nodes = nodes;
  }

  computeDatesWithTodos(options: { end: Date; start: Date }): Date[] {
    const { end, start } = options;
    if (start > end) throwError("START_DATE_IS_AFTER_END_DATE");

    const uncompletedDatedTodos = this.selectUncompletedDatedTodos();

    const datesWithTodos: Date[] = [];
    const currentDateStart = new Date(start);
    do {
      currentDateStart.setHours(0, 0, 0, 0);
      const currentDateEnd = new Date(currentDateStart);
      currentDateEnd.setHours(23, 59, 59, 999);
      const options = { end: currentDateEnd, start: currentDateStart };

      const hasTodoOnDate = uncompletedDatedTodos.some(todo => todo.spansOn(options));
      if (hasTodoOnDate) datesWithTodos.push(currentDateStart);

      currentDateStart.setDate(currentDateStart.getDate() + 1);
    } while (currentDateStart <= end);

    return datesWithTodos;
  }

  private selectUncompletedDatedTodos() {
    const uncompletedDatedTodos: TodoArtifact[] = [];
    const nodes = this.nodes.list();
    for (const node of nodes) {
      if (!(node instanceof TodoArtifact)) continue;
      if (!node.isLoaded()) continue;
      if (node.completed()) continue;
      if (!node.hasDates()) continue;
      uncompletedDatedTodos.push(node);
    }
    return uncompletedDatedTodos;
  }

}