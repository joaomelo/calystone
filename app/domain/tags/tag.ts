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

  remove(todo: TodoArtifact) {
    this.todos.delete(todo);
  }
}
