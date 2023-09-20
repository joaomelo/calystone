export function createIsChildOf(parentOrParentId) {
  const parentId = parentOrParentId?.id || parentOrParentId;
  return (artifact) => artifact.parentId === parentId;
}
