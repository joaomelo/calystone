import { getItem } from "@lib";

export function getArtifact(dependencies, id) {
  const { selector } = dependencies;
  return getItem(selector, { id, name: "artifacts" });
}
