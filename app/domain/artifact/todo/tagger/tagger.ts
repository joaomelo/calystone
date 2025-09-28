import { asArray } from "@/utils";

import { Tag } from "./tag";

export class Tagger {
  private readonly _tags: Tag[] = [];

  constructor(tags: Tag[] = []) {
    this.add(tags);
  }

  get list(): Tag[] {
    return this._tags;
  }

  get size() {
    return this._tags.length;
  }

  get empty() {
    return this.size === 0;
  }

  get full() {
    return !this.empty;
  }

  get labels(): string[] {
    const labels = this._tags.map((t) => t.label);
    return labels.sort();
  }

  has(value: string | Tag): boolean {
    const tag = Tag.create(value);
    return this._tags.some((t) => t.equals(tag));
  }

  add(value: string | string[] | Tag | Tag[]): void {
    const values = asArray(value);
    const tags = values.map((value) => Tag.create(value));

    tags.forEach((tag) => {
      if (this.has(tag)) return;
      this._tags.push(tag);
    });
  }

  remove(value: string | Tag): void {
    const tag = Tag.create(value);
    const index = this._tags.findIndex((t) => t.equals(tag));
    if (index === -1) return;
    this._tags.splice(index, 1);
  }

  difference(other: Tagger): Tagger {
    const tagsThisHasButOtherDont = this._tags.filter((tag) => !other.has(tag));
    return new Tagger(tagsThisHasButOtherDont);
  }
}