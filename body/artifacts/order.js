export function identifyLastOrder(dependencies, { parentId }) {
  const { artifactsSelect } = dependencies;
  const children = artifactsSelect.list((a) => (a.parentId = parentId));
  const lastOrder = children.reduce((acc, child) => {
    const siblingOrder = child.order || 0;
    return Math.max(acc, siblingOrder);
  }, 0);
  return lastOrder;
}
