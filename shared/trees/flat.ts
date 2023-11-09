import type { Node } from "./node";

export function flatTree(tree: Node[]) {
  const result: Omit<Node, "children">[] = [];

  tree.forEach(({ children, ...data }) => {
    result.push(data);
    result.push(...flatTree(children));
  });

  return result;
}
