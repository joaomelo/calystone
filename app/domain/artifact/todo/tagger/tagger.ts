import { asArray } from "@/utils";

import { Tag } from "./tag";

export type TagsManyOptions = TagsSingleOptions | TagsSingleOptions[];
export type TagsSingleOptions = string | Tag;

export class Tagger {
  private readonly _tags: Tag[] = [];

  constructor(value: TagsManyOptions = []) {
    this.add(value);
  }

  get list(): Tag[] {
    const list = Array.from(this._tags);
    list.sort((a, b) => Tag.compareByLabel(a, b));
    return list;
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
    const labels = this.list.map((t) => t.label);
    return labels.sort();
  }

  has(value: TagsSingleOptions): boolean {
    const tag = Tag.create(value);
    return this._tags.some((t) => t.equals(tag));
  }

  add(value: TagsManyOptions): void {
    const values = asArray(value);
    const tags = values.map((value) => Tag.create(value));

    tags.forEach((tag) => {
      if (this.has(tag)) return;
      this._tags.push(tag);
    });
  }

  remove(value: TagsSingleOptions): void {
    const tag = Tag.create(value);
    const index = this._tags.findIndex((t) => t.equals(tag));
    if (index === -1) return;
    this._tags.splice(index, 1);
  }

  difference(value: Tagger | TagsManyOptions): Tagger {
    const other = value instanceof Tagger
      ? value
      : new Tagger(value);

    const myTags = this.list;
    const tagsThisHasButOtherDont = myTags.filter((tag) => !other.has(tag));

    return new Tagger(tagsThisHasButOtherDont);
  }
}