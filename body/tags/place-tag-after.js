import { getTag } from "./get-tag";
import { moveTag } from "./move-tag";

export function placeTagAfter(dependencies, { referenceId, sourceId }) {
  const { order } = getTag(dependencies, referenceId);
  return moveTag(dependencies, { before: order + 1, id: sourceId });
}
