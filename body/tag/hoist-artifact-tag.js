import { moveArtifactOnTag } from "./move-artifact-tag";
import { orderOfArtifactOnTag } from "./order";

export function hoistArtifactOnTag(dependencies, { hoistedId, referenceId, tagId }) {
  const order = orderOfArtifactOnTag(dependencies, { artifactId: referenceId, tagId });
  return moveArtifactOnTag(dependencies, { artifactId: hoistedId, order, tagId });
}