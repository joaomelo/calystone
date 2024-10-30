import type { Id } from "@/utils";

import { createId } from "@/utils";

export interface Parent {
  adopt(child: Artifact): void;
  path(): string;
}

export abstract class Artifact {
  public readonly id: Id;
  public name: string;
  public parent?: Parent;

  constructor(name: string, parent?: Parent) {
    this.id = createId();
    this.name = name;
    this.affiliate(parent);
  }

  affiliate(parent? : Parent) {
    if (parent) {
      this.parent = parent;
      this.parent.adopt(this);
    }
  }

  path(): string {
    return this.parent ? `${this.parent.path()}/${this.name}` : this.name;
  }
}
