import { listArtifacts } from "./list-artifacts";

export function getLastOrder(dependencies, parentId = null) {
  const artifacts = listArtifacts(dependencies);
  const children = artifacts.filter(a => a.parentId === parentId);
  const lastOrder = children.reduce((acc, child) => {
    const siblingOrder = child.order || 0;
    return Math.max(acc, siblingOrder);
  }, 0);
  return lastOrder;
}
