export function getArtifact(dependencies, id) {
  const { artifactsSelector } = dependencies;
  return artifactsSelector.get(id);
}
