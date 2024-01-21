import { getTag } from "@body";
import { asArray, extractId } from "@lib";

import { getArtifact } from "./get-artifact";

export function listArtifactsOfTag(dependencies, tagIdOrTag) {
  const tagId = extractId(tagIdOrTag);
  const tag = getTag(dependencies, tagId);
  const tagArtifactsIds = asArray(tag.artifactsIds);
  const ofTag = tagArtifactsIds.map(artifactId => getArtifact(dependencies, artifactId));
  return ofTag;
}
