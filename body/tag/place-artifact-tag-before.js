import { moveArtifactInTag } from "./move-artifact-tag";
import { orderOfArtifactOnTag } from "./order";

export function placeArtifactInTagBefore(dependencies, { hoistedId, referenceId, tagId }) {
  const order = orderOfArtifactOnTag(dependencies, { artifactId: referenceId, tagId });
  return moveArtifactInTag(dependencies, { artifactId: hoistedId, order, tagId });
}
