import type { Node, Treeable } from "./treeable";

export function flatTree(tree: Node[]) {
  const result: Treeable[] = [];

  const add = (nodes: Node[]) => {
    nodes.forEach(({ children, ...treeable }) => {
      result.push(treeable);
      add(children);
    });
  };

  add(tree);

  return result;
}