import { mutate } from "@lib";

export function delTag(dependencies, idOrTag) {
  const { mutator } = dependencies;
  return mutate(mutator, {
    data: idOrTag,
    method: "del",
    name: "tags",
  });
}
