import type { Artifact } from "@/domain/artifact";
import type { Artifacts } from "@/domain/artifacts";

import type { Directory } from "./directory";

import { isDirectory } from "./is";
import { listChildren } from "./list";

export function count(artifacts: Artifacts, directory: Directory): number {
  const children = listChildren(artifacts, directory);
  if (children.length === 0) return 0;

  return children.reduce(
    (acc: number, child: Artifact) =>
      (isDirectory(child))
        ? acc + count(artifacts, child)
        : acc,
    children.length
  );
}
