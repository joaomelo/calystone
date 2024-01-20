import { identifyLastTagsOrder, listTags } from "@body";
import { mutate } from "@lib";

import { getTag } from "./get-tag";

export function moveTag(dependencies, { before, id }) {
  // if the user wanted to move tag to the last position the value passed will be last order plus one.
  const beforeMax = identifyLastTagsOrder(dependencies) + 1;

  if (before < 0 || before > beforeMax) {
    throw new Error(`the before "${before}" is invalid. when moving the tag "${id}" the before must be greater than or equal to 0 and small than or equal to "${beforeMax}"`);
  }

  const tag = getTag(dependencies, id);
  const originalOrder = tag.order;

  // if the original order is smaller than the before order target we take target and subtract one, since after removing the element all subsequent elements will need reorder
  const newOrder = originalOrder < before
    ? before - 1
    : before;
  if (originalOrder === newOrder) return;

  const { manifests, push } = createManifests();
  push(id, newOrder);

  const tags = listTags(dependencies);

  if (originalOrder < newOrder) {
    // we will reduce the order of every tag after the affected tag and before or equal to the new order
    const subjects = tags.filter(({ order }) =>
      order > originalOrder
      && order <= newOrder,
    );
    subjects.forEach(({ id, order }) => push(id, order - 1));
  }

  if (originalOrder > newOrder) {
    // we will increase the order of every tag equal or after the target new order and before the original order of moving tag to create a hole to place the moving tag
    const subjects = tags.filter(({ order }) =>
      order >= newOrder
      && order < originalOrder,
    );
    subjects.forEach(({ id, order }) => push(id, order + 1));
  }

  const { mutator } = dependencies;

  return mutate(mutator, manifests);
}

function createManifests() {
  const manifests = [];
  const push = (id, order) => manifests.push({
    data: { id, order },
    method: "put",
    name: "tags",
  });
  return { manifests, push };
}
