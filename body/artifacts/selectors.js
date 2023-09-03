export function createIsChildOf(parentOrId) {
  const id = typeof parentOrId?.id === "string" ? parentOrId.id : parentOrId;
  return (artifact) => artifact.parentId === id;
}

export function createIsOfUser(user) {
  return (artifact) => {
    if (!artifact.usersIds) return false;
    return artifact.usersIds.includes(user.id);
  };
}

export function isRoot(artifact) {
  return !artifact.parentId;
}
