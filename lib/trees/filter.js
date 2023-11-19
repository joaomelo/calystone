export function filterTree(tree, filter) {
  const result = [];
  tree.forEach((node) => {
    if (filter(node)) return result.push(node);
    result.push(...filterTree(node.children, filter));
  });
  return result;
}
