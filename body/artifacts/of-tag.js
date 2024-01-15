import { asArray, extractId } from "@lib";

import { getTag } from "../tag";
import { listArtifacts } from "./artifacts";

export function listArtifactsOfTag(dependencies, tagIdOrTag) {
  const allArtifacts = listArtifacts(dependencies);

  const tagId = extractId(tagIdOrTag);
  const tag = getTag(dependencies, tagId);
  const tagArtifactsIds = asArray(tag.artifactsIds);

  const ofTag = allArtifacts.filter(({ id }) => tagArtifactsIds.includes(id));
  return ofTag;
}
