export function nextOrder(parentId, artifacts) {
  const lastOrder = artifacts.reduce((acc, artifact) => {
    if (artifact.parentId !== parentId) return acc;
    const siblingOrder = artifact.order || 0;
    return Math.max(acc, siblingOrder);
  }, -1);
  return lastOrder + 1;
}
