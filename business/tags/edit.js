import { atLeastOneField, extractId, mutate } from "@lib";

import { contentFields } from "./parse";

export function editTag(dependencies, payload) {
  atLeastOneField(payload, contentFields);

  const id = extractId(payload);
  const data = { id };

  if (payload.name !== undefined) data.name = payload.name;

  const { mutator } = dependencies;
  return mutate(mutator, {
    data,
    method: "put",
    name: "tags",
  });
}
