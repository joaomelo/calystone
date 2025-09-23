import { throwCritical } from "@/utils";

export class Tag {
  readonly label: string;

  constructor(label: string) {
    if (label.length === 0) {
      throwCritical("TAG_LABEL_CANNOT_BE_EMPTY");
    }

    this.label = label;
  }

  static create(value: string | Tag): Tag {
    return typeof value === "string" ? new Tag(value) : value;
  }

  equals(other: Tag): boolean {
    return this.label === other.label;
  }
}