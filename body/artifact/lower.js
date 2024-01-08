import { getArtifact } from "@body";

import { moveArtifact } from "./move";

export function lowerArtifact(dependencies, { id, siblingId }) {
  const { order, parentId } = getArtifact(dependencies, siblingId);
  return moveArtifact(dependencies, { id, order: order + 1, parentId });
}
