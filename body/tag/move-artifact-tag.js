import { mutate } from "@lib";

import { getTag } from "./get-tag";
import { orderOfArtifactOnTag } from "./order";

export function moveArtifactOnTag(dependencies, { artifactId, order, tagId }) {
  const tag = getTag(dependencies, tagId);
  const maxIndex = tag.artifactsIds.length;

  if (order < 0 || order > maxIndex) {
    throw new Error(`the order "${order}" is invalid. when moving the artifact "${artifactId}" in the tag "${tagId}" the new order must be greater than or equal to 0 and small than or equal to "${maxIndex}"`);
  }

  const originalOrder = orderOfArtifactOnTag(dependencies, { artifactId, tagId });
  if (originalOrder === -1) {
    throw new Error(`the artifact "${artifactId}" can't be moved to order "${order}" since it is not present in the tag "${tagId}"`);
  }
  if (originalOrder === order) return;

  // if the original order is smaller than the target order we have to correct the target, since after splicing the element from its original position will affect the target index
  const newOrder = originalOrder > order
    ? order
    : order - 1;
  const artifactsIds = tag.artifactsIds.toSpliced(originalOrder, 1);
  artifactsIds.splice(newOrder, 0, artifactId);

  const data = { artifactsIds, id: tagId };
  const { mutator } = dependencies;
  return mutate(mutator, {
    data,
    method: "put",
    name: "tags",
  });
}
