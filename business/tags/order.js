import { getTag } from "./get-tag";

export function orderOfArtifactOnTag(dependencies, { artifactId, tagId }) {
  const tag = getTag(dependencies, tagId);
  const order = tag.artifactsIds.indexOf(artifactId);
  return order;
}
