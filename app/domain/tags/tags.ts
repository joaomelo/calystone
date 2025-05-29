import type { TodoArtifact } from "../artifact/todo";

import { Tag } from "./tag";

export class Tags {
  hash = new Map<string, Tag>();

  add(todo: TodoArtifact) {
    const names = todo.tagger.list();
    for (const name of names) {
      const tag = this.hash.get(name);
      if (tag) {
        tag.add(todo);
      } else {
        const tag = new Tag(name);
        this.hash.set(name, tag);
        tag.add(todo);
      }
    }
  }

  difference(todo: TodoArtifact): string[] {
    const allNames = this.names();
    const todoNames = todo.tagger.list();
    return allNames.filter(name => !todoNames.includes(name));
  }

  get(name: string): Tag | undefined {
    return this.hash.get(name);
  }

  list(): Tag[] {
    const list = Array.from(this.hash.values());
    return list;
  }

  names(): string[] {
    const names = this.list().map(tag => tag.name);
    return names;
  }
}