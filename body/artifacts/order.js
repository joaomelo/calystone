import { list } from "@lib";

export function identifyLastOrder(dependencies, { parentId = null } = {}) {
  const { selector } = dependencies;
  const artifacts = list(selector, "artifacts");
  const children = artifacts.filter((a) => (a.parentId = parentId));
  const lastOrder = children.reduce((acc, child) => {
    const siblingOrder = child.order || 0;
    return Math.max(acc, siblingOrder);
  }, 0);
  return lastOrder;
}
