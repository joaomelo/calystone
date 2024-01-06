import { currentUser, mutate } from "@lib";

export function addTag(dependencies, name = null) {
  const { auth } = dependencies;
  const { id: userId } = currentUser(auth);

  const tag = { userId, name };

  const { mutator } = dependencies;
  return mutate(mutator, {
    name: "tags",
    method: "add",
    data: tag,
  });
}
