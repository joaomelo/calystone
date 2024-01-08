import { identifyLastTagsOrder } from "@body";
import { atLeastOneField, currentUser, mutate } from "@lib";

import { contentFields } from "./parse";

export function addTag(dependencies, payload) {
  atLeastOneField(payload, contentFields);
  const order = identifyLastTagsOrder(dependencies) + 1;

  const { name = null } = payload;

  const { auth } = dependencies;
  const { id: userId } = currentUser(auth);

  const tag = { name, order, userId };

  const { mutator } = dependencies;
  return mutate(mutator, {
    data: tag,
    method: "add",
    name: "tags",
  });
}
