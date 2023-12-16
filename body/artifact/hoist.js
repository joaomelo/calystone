import { getArtifact } from "@body";
import { moveArtifact } from "./move";

export function hoistArtifact(dependencies, { id, siblingId }) {
  const { parentId, order } = getArtifact(dependencies, siblingId);
  return moveArtifact(dependencies, { id, parentId, order });
}
