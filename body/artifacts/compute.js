export function computeArtifacts(dependencies, getter) {
  const { artifactsSelect } = dependencies;
  return artifactsSelect.computed(getter);
}
