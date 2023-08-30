export function createArtifact({ artifactData, allUsers }) {
  const {
    id,
    name,
    notes,
    archivedAt = null,
    usersIds,
    parentId = null,
  } = artifactData;

  const artifact = { id, name, notes, archivedAt, parentId };

  if (usersIds) {
    artifact.users = usersIds.map((id) =>
      allUsers.find((user) => user.id === id)
    );
  }

  return artifact;
}
