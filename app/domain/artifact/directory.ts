import type { Parent } from "./artifact";

import { Artifact } from "./artifact";

export class Directory extends Artifact implements Parent {
  public readonly children: Artifact[] = [];

  adopt(child: Artifact) {
    this.children.push(child);
  }

  count(): number {
    return this.children.reduce(
      (count, child) => child instanceof Directory ? count + child.count() : count,
      this.children.length
    );
  }
};
