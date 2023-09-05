export function createIsChildOf(parentOrParentId) {
  const parentId =
    typeof parentOrParentId?.id === "string"
      ? parentOrParentId.id
      : parentOrParentId;
  return (artifact) => artifact.parentId === parentId;
}

export function createIsOfUser(user) {
  return (artifact) => {
    if (!artifact.usersIds) return false;
    return artifact.usersIds.includes(user.id);
  };
}

export function isArchived(artifact) {
  return !!artifact.archivedAt;
}
