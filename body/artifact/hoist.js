import { getArtifact } from "@body";

import { moveArtifact } from "./move";

export function hoistArtifact(dependencies, { id, siblingId }) {
  const { order, parentId } = getArtifact(dependencies, siblingId);
  return moveArtifact(dependencies, { id, order, parentId });
}
