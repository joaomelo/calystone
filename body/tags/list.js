import { listItems } from "@lib";

export function listTags(dependencies) {
  const { selector } = dependencies;
  return listItems(selector, "tags");
}

export function listTagsOf(dependencies, artifactId) {
  const allTags = listTags(dependencies);
  return allTags.filter(t => t.artifactsIds?.includes(artifactId));
}
