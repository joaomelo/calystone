export class Tagger {
  tags = new Set<string>();

  constructor(tags?: string[]) {
    this.tags = new Set(tags);
  }

  add(tag: string | string[]) {
    if (Array.isArray(tag)) {
      tag.forEach((t) => { this.add(t); });
    } else {
      this.tags.add(tag);
    }
  }

  has(tag: string): boolean {
    return this.tags.has(tag);
  }

  hasTags() {
    return this.tags.size > 0;
  }

  list(): string[] {
    return Array.from(this.tags).sort();
  }

  remove(tag: string) {
    this.tags.delete(tag);
  }
}