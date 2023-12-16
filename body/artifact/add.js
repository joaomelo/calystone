import { mutate, currentUser } from "@lib";
import { identifyLastOrder } from "./order";

export function addArtifact(dependencies, payload) {
  const parsed = parse(payload);

  const order = identifyLastOrder(dependencies, parsed) + 1;
  const { id: userId } = currentUser(dependencies);
  const artifact = { ...parsed, userId, order };

  const { mutator } = dependencies;

  return mutate(mutator, {
    name: "artifacts",
    method: "add",
    payload: artifact,
  });
}

function parse(payload) {
  const {
    name = null,
    notes = null,
    parentId = null,
    status = "active",
  } = payload;

  return {
    name,
    notes,
    parentId,
    status,
  };
}
