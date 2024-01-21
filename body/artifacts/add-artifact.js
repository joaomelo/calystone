import { getLastOrder } from "@body";
import { atLeastOneField, currentUser, mutate } from "@lib";

import { ARTIFACT_STATUSES } from "./artifact-statuses";
import { contentFields, parseDates, parseParent } from "./parse";

export function addArtifact(dependencies, payload) {
  atLeastOneField(payload, contentFields);

  const parentId = parseParent(payload);
  const status = ARTIFACT_STATUSES.ACTIVE;
  const order = getLastOrder(dependencies, parentId) + 1;
  const { name = null, notes = null } = payload;
  const { end, start } = parseDates(payload);

  const { auth } = dependencies;
  const { id: userId } = currentUser(auth);

  // is useful to secure that every content field is present and has a default value. payloads and functions like filters based on db data will have reliable behavior
  const artifact = {
    end,
    name,
    notes,
    order,
    parentId,
    start,
    status,
    userId,
  };

  const { mutator } = dependencies;
  return mutate(mutator, {
    data: artifact,
    method: "add",
    name: "artifacts",
  });
}
