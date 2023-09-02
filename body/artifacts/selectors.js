export function isOfUser(artifact, user) {
  if (!artifact.usersIds) return false;
  return artifact.usersIds.includes(user.id);
}

export function childrenOf(parent, allArtifacts) {
  return allArtifacts.filter((maybeChild) => isOfParent(maybeChild, parent));
}

export function isOfParent(maybeChild, parent) {
  if (!maybeChild.parentId) return false;
  return maybeChild.parentId === parent.id;
}
