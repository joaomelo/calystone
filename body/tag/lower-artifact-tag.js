import { moveArtifactOnTag } from "./move-artifact-tag";
import { orderOfArtifactOnTag } from "./order";

export function lowerArtifactOnTag(dependencies, { loweredId, referenceId, tagId }) {
  const order = orderOfArtifactOnTag(dependencies, { artifactId: referenceId, tagId });
  return moveArtifactOnTag(dependencies, { artifactId: loweredId, order: order + 1, tagId });
}
