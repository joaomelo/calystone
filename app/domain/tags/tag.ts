import type { TodoArtifact } from "../artifact/todo";

export class Tag {
  name: string;
  todos = new Set<TodoArtifact>();

  constructor(name: string) {
    this.name = name;
  }

  add(todo: TodoArtifact) {
    this.todos.add(todo);
  }

  list(): TodoArtifact[] {
    return Array.from(this.todos);
  }

  prioritize(): TodoArtifact[] {
    const list = this.list();
    list.sort((a, b) => {
      const result = a.prioritizer.compareTo(b.prioritizer);
      if (result === 0) {
        return a.basename().localeCompare(b.basename());
      }
      return result;
    });
    return list;
  }

  remove(todo: TodoArtifact) {
    this.todos.delete(todo);
  }
}
