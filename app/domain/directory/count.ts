import type { Artifact } from "@/domain/artifact";

import type { Directory } from "./directory";

import { isDirectory } from "./is";

export function count(directory: Directory): number {
  return directory.children.reduce(
    (acc: number, child: Artifact) => (isDirectory(child)) ? acc + count(child) : acc, directory.children.length
  );
}
