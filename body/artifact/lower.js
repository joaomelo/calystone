import { getArtifact } from "@body";
import { moveArtifact } from "./move";

export function lowerArtifact(dependencies, { id, siblingId }) {
  const { parentId, order } = getArtifact(dependencies, siblingId);
  return moveArtifact(dependencies, { id, parentId, order: order + 1 });
}
