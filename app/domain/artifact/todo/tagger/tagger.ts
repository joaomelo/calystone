import { asArray } from "@/utils";

import { Tag } from "./tag";

export class Tagger {
  readonly tags: Tag[] = [];

  constructor(tags?: Tag[]) {
    if (!tags) return;
    this.add(tags);
  }

  add(value: string | string[] | Tag | Tag[]): void {
    const values = asArray(value);
    const tags = values.map((value) => Tag.create(value));

    tags.forEach((tag) => {
      if (this.has(tag)) return;
      this.tags.push(tag);
    });
  }

  combine(other: Tagger): Tagger {
    const combinedTags = [...this.tags, ...other.tags];
    return new Tagger(combinedTags);
  }

  difference(other: Tagger): Tagger {
    const tagsThisHasButOtherDont = this.tags.filter((tag) => !other.has(tag));
    return new Tagger(tagsThisHasButOtherDont);
  }

  empty() {
    return this.size() === 0;
  }

  full() {
    return !this.empty();
  }

  has(value: string | Tag): boolean {
    const tag = Tag.create(value);
    return this.tags.some((t) => t.equals(tag));
  }

  labels(): string[] {
    const labels = this.tags.map((t) => t.label);
    return labels.sort();
  }

  remove(value: string | Tag): void {
    const tag = Tag.create(value);
    const index = this.tags.findIndex((t) => t.equals(tag));
    if (index === -1) return;
    this.tags.splice(index, 1);
  }

  size() {
    return this.tags.length;
  }
}