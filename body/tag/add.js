import { atLeastOneField, currentUser, mutate } from "@lib";
import { identifyLastTagsOrder } from "@body";

import { contentFields } from "./parse";

export function addTag(dependencies, payload) {
  atLeastOneField(payload, contentFields);
  const order = identifyLastTagsOrder(dependencies) + 1;

  const { name = null } = payload;

  const { auth } = dependencies;
  const { id: userId } = currentUser(auth);

  const tag = { userId, name, order };

  const { mutator } = dependencies;
  return mutate(mutator, {
    name: "tags",
    method: "add",
    data: tag,
  });
}
