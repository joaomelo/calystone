import type { Artifact } from "@/domain/artifact";
import type { Artifacts } from "@/domain/artifacts";

import { createIsChildren } from "@/domain/artifact";
import { list } from "@/domain/artifacts";

import type { Directory } from "./directory";

import { isDirectory } from "./is";

export function count(artifacts: Artifacts, directory: Directory): number {
  const children = list(artifacts).filter(createIsChildren(directory));
  if (children.length === 0) return 0;

  return children.reduce(
    (acc: number, child: Artifact) =>
      (isDirectory(child))
        ? acc + count(artifacts, child)
        : acc,
    children.length
  );
}
