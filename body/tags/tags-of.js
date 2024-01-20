import { listTags } from "./list-tags";

export function listTagsOf(dependencies, artifactId) {
  const allTags = listTags(dependencies);
  return allTags.filter(t => t.artifactsIds?.includes(artifactId));
}
