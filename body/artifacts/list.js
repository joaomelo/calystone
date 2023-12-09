export function listArtifacts(dependencies, predicate) {
  const { artifactsSelect } = dependencies;
  return artifactsSelect.list(predicate);
}
