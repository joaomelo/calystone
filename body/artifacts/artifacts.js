import { listItems } from "@lib";

export function listArtifacts(dependencies) {
  const { selector } = dependencies;
  return listItems(selector, "artifacts");
}
