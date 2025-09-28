import type { SpawnCollectionsService } from "@/services/spawn-collections-service";

import { TodoArtifact } from "@/domain";
import { throwError } from "@/utils";

export class TrackTodosService {
  private readonly spawnCollections: SpawnCollectionsService;

  constructor(spawnCollections: SpawnCollectionsService) {
    this.spawnCollections = spawnCollections;
  }

  datesWithTodosWithin(options: {
    end: Date;
    start: Date
  }): Date[] {
    this.throwIfDatesAreInvalid(options);
    const {
      end,
      start
    } = options;

    const loadedTodos = this.selectLoadedTodos();
    const uncompletedDatedTodos = loadedTodos.filter(todo => todo.uncompleted() && todo.scheduler.hasDates );

    const datesWithTodos: Date[] = [];
    const currentDateStart = new Date(start);
    do {
      currentDateStart.setHours(0, 0, 0, 0);
      const currentDateEnd = new Date(currentDateStart);
      currentDateEnd.setHours(23, 59, 59, 999);
      const options = {
        end: currentDateEnd,
        start: currentDateStart
      };

      const hasTodoOnDate = uncompletedDatedTodos.some(todo => todo.scheduler.spansOn(options));
      if (hasTodoOnDate) datesWithTodos.push(new Date(currentDateStart));

      currentDateStart.setDate(currentDateStart.getDate() + 1);
    } while (currentDateStart <= end);

    return datesWithTodos;
  }

  todosWithin(options: {
    end: Date;
    start: Date,
  }) {
    this.throwIfDatesAreInvalid(options);
    const loadedTodos = this.selectLoadedTodos();
    const todosWithin = loadedTodos.filter(todo => todo.scheduler.spansOn(options));
    return todosWithin;
  }

  private selectLoadedTodos() {
    const loadedTodos: TodoArtifact[] = [];
    const nodes = this.spawnCollections.list();
    for (const node of nodes) {
      if (!(node instanceof TodoArtifact)) continue;
      if (!node.isLoaded()) continue;
      loadedTodos.push(node);
    }
    return loadedTodos;
  }

  private throwIfDatesAreInvalid(options: {
    end: Date;
    start: Date
  }) {
    const {
      end,
      start
    } = options;
    if (start > end) throwError("START_DATE_IS_AFTER_END_DATE");
  }

}