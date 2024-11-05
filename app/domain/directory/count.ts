import type { Artifact } from "@/domain/artifact";
import type { Artifacts } from "@/domain/artifacts";

import { isChildrenWith } from "@/domain/artifact";
import { list } from "@/domain/artifacts";

import type { Directory } from "./directory";

import { isDirectory } from "./is";

export function createCount(artifacts: Artifacts) {
  const count = (directory: Directory): number => {
    const children = list(artifacts).filter(isChildrenWith(directory));
    if (children.length === 0) return 0;

    return children.reduce(
      (acc: number, child: Artifact) =>
        (isDirectory(child))
          ? acc + count(child)
          : acc,
      children.length
    );
  };
  return count;
}