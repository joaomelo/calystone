import { getTag } from "./get-tag";
import { moveTag } from "./move-tag";

export function placeTagBefore(dependencies, { referenceId, sourceId }) {
  const { order } = getTag(dependencies, referenceId);
  return moveTag(dependencies, { before: order, id: sourceId });
}
