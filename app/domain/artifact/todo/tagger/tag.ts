import { throwCritical } from "@/utils";

export class Tag {

  static create(value: string | Tag): Tag {
    return typeof value === "string" ? new Tag(value) : value;
  }

  private readonly _label: string;

  constructor(label: string) {
    if (label.length === 0) {
      throwCritical("TAG_LABEL_CANNOT_BE_EMPTY");
    }

    this._label = label;
  }

  get label() {
    return this._label;
  }

  equals(other: Tag): boolean {
    return this._label === other._label;
  }
}