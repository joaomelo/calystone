import { mutate, currentUser } from "@lib";
import { identifyLastOrder } from "./order";

export function addArtifact(dependencies, payloadData) {
  const parsed = parse(payloadData);

  const order = identifyLastOrder(dependencies, parsed) + 1;
  const { id: userId } = currentUser(dependencies);
  const payload = { ...parsed, userId, order };

  const { mutator } = dependencies;
  return mutate(mutator, { name: "artifacts", method: "add", payload });
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
