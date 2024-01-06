import { currentUser, mutate } from "@lib";
import { identifyLastTagsOrder } from "@body";

export function addTag(dependencies, name = null) {
  const order = identifyLastTagsOrder(dependencies) + 1;

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
