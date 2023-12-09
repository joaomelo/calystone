import { currentUser } from "@body";
import { identifyLastOrder } from "./order";

export function addArtifact(dependencies, payload) {
  const parsed = parse(payload);

  const lastOrder = identifyLastOrder(dependencies, parsed);
  const { id: userId } = currentUser(dependencies);
  const complete = { ...parsed, userId, order: lastOrder + 1 };

  const { artifactsMutator } = dependencies;
  return artifactsMutator.add(complete);
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
