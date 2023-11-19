export function flatTree(tree) {
  const result = [];
  tree.forEach(({ children, ...data }) => {
    result.push(data);
    result.push(...flatTree(children));
  });
  return result;
}
