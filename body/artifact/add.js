import { currentUser, mutate } from "@lib";
import { identifyLastArtifactsOrder } from "@body";
import { atLeastOneField, parseDates, parseParent } from "./parse";
import { ARTIFACT_STATUSES } from "./statuses";

export function addArtifact(dependencies, payload) {
  atLeastOneField(payload);

  const parentId = parseParent(payload);
  const status = ARTIFACT_STATUSES.ACTIVE;
  const order = identifyLastArtifactsOrder(dependencies, parentId) + 1;
  const { name = null, notes = null } = payload;
  const { start, end } = parseDates(payload);

  const { auth } = dependencies;
  const { id: userId } = currentUser(auth);

  // is useful to secure that every content field is present and has a default value. payloads and functions like filters based on db data will have reliable behavior
  const artifact = {
    userId,
    parentId,
    status,
    order,
    name,
    notes,
    start,
    end,
  };

  const { mutator } = dependencies;
  return mutate(mutator, {
    name: "artifacts",
    method: "add",
    data: artifact,
  });
}
