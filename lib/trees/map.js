export function mapTree(tree, map) {
  return tree.map(node => mapItem(node, map));
}

function mapItem(node, map) {
  const mapped = map(node);
  const children = node.children.map(child => mapItem(child, map));
  return { ...mapped, children };
}
