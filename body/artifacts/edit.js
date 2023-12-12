export function editArtifact(dependencies, payload) {
  if (!payload.id) throw new Error("artifact edit requires a id to perform");

  const { artifactsMutator } = dependencies;
  return artifactsMutator.put(payload);
}
