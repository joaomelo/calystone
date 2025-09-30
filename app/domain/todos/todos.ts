import type { TagsSingleOptions } from "@/domain/artifact";
import type { Nodes } from "@/domain/nodes";

import {
  Prioritizer,
  Tagger,
  TodoArtifact
} from "@/domain/artifact";

export class Todos {
  private readonly nodes: Nodes;

  constructor(nodes: Nodes) {
    this.nodes = nodes;
  }

  list() {
    const todos: TodoArtifact[] = [];
    const nodes = this.nodes.list();
    for (const node of nodes) {
      if (!(node instanceof TodoArtifact)) continue;
      todos.push(node);
    }
    return todos;
  }

  hasTag(value: TagsSingleOptions) {
    const todos = this.list();
    return todos.filter(todo => todo.hasTag(value));
  }

  spansOn(options: {
    end: Date;
    start: Date,
  }) {
    const todos = this.list();
    return todos.filter(todo => todo.spansOn(options));
  }

  datesWithUncompleted({
    end,
    start
  }: {
    end: Date;
    start: Date,
  }) {
    const target = this.list().filter(todo => todo.uncompleted && todo.hasDates);

    const datesWithUncompletedTodos: Date[] = [];
    const currentDateStart = new Date(start);
    do {
      currentDateStart.setHours(0, 0, 0, 0);
      const currentDateEnd = new Date(currentDateStart);
      currentDateEnd.setHours(23, 59, 59, 999);
      const options = {
        end: currentDateEnd,
        start: currentDateStart
      };

      const hasTodoOnDate = target.some(todo => todo.spansOn(options));
      if (hasTodoOnDate) datesWithUncompletedTodos.push(new Date(currentDateStart));

      currentDateStart.setDate(currentDateStart.getDate() + 1);
    } while (currentDateStart <= end);

    return datesWithUncompletedTodos;
  }

  tagger() {
    const tagger = new Tagger();
    const todos = this.list();
    for (const todo of todos) {
      tagger.add(todo.tags);
    }
    return tagger;
  }

  prioritizer() {
    const prioritizer = new Prioritizer();
    const todos = this.list();
    for (const todo of todos) {
      const zeroedCriteria = todo
        .criteria
        .map(criterion => criterion.zeroed());
      prioritizer.update(zeroedCriteria);
    }
    return prioritizer;
  }

}