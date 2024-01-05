import { currentUser, mutate } from "@lib";
import { identifyLastOrder } from "@body";
import { parseContent, parseParent } from "./parse";
import { ARTIFACT_STATUSES } from "./statuses";

export function addArtifact(dependencies, payload) {
  const parsed = parse(payload);

  const order = identifyLastOrder(dependencies, parsed.parentId) + 1;

  const { auth } = dependencies;
  const { id: userId } = currentUser(auth);

  const artifact = { ...parsed, userId, order };

  const { mutator } = dependencies;
  return mutate(mutator, {
    name: "artifacts",
    method: "add",
    payload: artifact,
  });
}

function parse(payload) {
  // is useful to secure that every field is present and has a default value. payloads and functions like filters based on db data will have reliable behavior
  const parentId = parseParent(payload);
  const { name, notes, start, end } = parseContent(payload);
  const status = ARTIFACT_STATUSES.ACTIVE;

  return {
    name,
    notes,
    status,
    parentId,
    start,
    end,
  };
}
