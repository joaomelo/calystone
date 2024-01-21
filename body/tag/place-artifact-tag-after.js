import { moveArtifactInTag } from "./move-artifact-tag";
import { orderOfArtifactOnTag } from "./order";

export function placeArtifactInTagAfter(dependencies, { loweredId, referenceId, tagId }) {
  const order = orderOfArtifactOnTag(dependencies, { artifactId: referenceId, tagId });
  return moveArtifactInTag(dependencies, { artifactId: loweredId, order: order + 1, tagId });
}
