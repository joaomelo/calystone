import type { Parent } from "./artifact";

import { Artifact } from "./artifact";

export class Directory extends Artifact implements Parent {
  public readonly children = new Set<Artifact>();

  adopt(child: Artifact) {
    this.children.add(child);
  }

  count(): number {
    let count = this.children.size;
    this.children.forEach((child) => {
      if (child instanceof Directory) {
        count += child.count();
      }
    });
    return count;
  }
};
