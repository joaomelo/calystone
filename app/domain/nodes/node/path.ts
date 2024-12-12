import type { Node } from "./node";

export function path(node: Node): string {
  const basePath = `/${node.name}`;
  const parent = node.parent();
  if (!parent) return basePath;
  return `${path(parent)}${basePath}`;
}
