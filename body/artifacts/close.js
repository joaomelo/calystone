import { closeSelect } from "@lib";

export function closeArtifacts(dependencies) {
  const { selector } = dependencies;
  closeSelect(selector);
}
