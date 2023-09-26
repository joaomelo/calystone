export function createIsChildOf(parentOrParentId) {
  const parentId = parentOrParentId?.id || parentOrParentId;
  return (artifact) => artifact.parentId === parentId;
}

export function createIsId(artifactOrId) {
  const id = artifactOrId?.id || artifactOrId;
  return (artifact) => artifact.id === id;
}
