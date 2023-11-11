import type { Node } from "./node";

export type Map = (node: Node) => Omit<Node, "children">;

export function mapTree(tree: Node[], map: Map): Node[] {
  return tree.map((node) => mapItem(node, map));
}

function mapItem(node: Node, map: Map): Node {
  const mapped = map(node);
  const children: Node[] = node.children.map((child) => mapItem(child, map));
  return { ...mapped, children };
}
