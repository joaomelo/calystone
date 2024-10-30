import type { Parent } from "./artifact";

import { Artifact } from "./artifact";

export class Directory extends Artifact implements Parent {
  public readonly children = new Set<Artifact>();

  adopt(child: Artifact) {
    this.children.add(child);
  }
};
