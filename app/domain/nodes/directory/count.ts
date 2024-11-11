import type { Node } from "../node";
import type { Nodes } from "../nodes";
import type { Directory } from "./directory";

import { createIsChildrenOf } from "../node";
import { list } from "../nodes";
import { isDirectory } from "./is";

export function createCount(nodes: Nodes) {
  const count = (directory: Directory): number => {
    const children = list(nodes).filter(createIsChildrenOf(directory));
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