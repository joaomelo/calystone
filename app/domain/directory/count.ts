import type { Node } from "@/domain/node";
import type { Nodes } from "@/domain/nodes";

import { isChildrenWith } from "@/domain/node";
import { list } from "@/domain/nodes";

import type { Directory } from "./directory";

import { isDirectory } from "./is";

export function createCount(nodes: Nodes) {
  const count = (directory: Directory): number => {
    const children = list(nodes).filter(isChildrenWith(directory));
    if (children.length === 0) return 0;

    return children.reduce(
      (acc: number, child: Node) =>
        (isDirectory(child))
          ? acc + count(child)
          : acc,
      children.length
    );
  };
  return count;
}