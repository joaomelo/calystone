import { getArtifact } from "@body";

import { moveArtifact } from "./move-artifact";

export function placeArtifactAfter(dependencies, { id, siblingId }) {
  const { order, parentId } = getArtifact(dependencies, siblingId);
  return moveArtifact(dependencies, { id, order: order + 1, parentId });
}
