import type { Node } from "./node";

export type Filter = (node: Node) => boolean;

export function filterTree(tree: Node[], filter: Filter): Node[] {
  const result: Node[] = [];

  tree.forEach((node) => {
    if (filter(node)) {
      result.push(node);
      return;
    }
    result.push(...filterTree(node.children, filter));
  });

  return result;
}
