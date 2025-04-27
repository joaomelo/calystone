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

  list(): string[] {
    return Array.from(this.tags);
  }

  remove(tag: string) {
    this.tags.delete(tag);
  }
}