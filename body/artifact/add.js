import { mutate, currentUser, isId, appError } from "@lib";
import { identifyLastOrder } from "./order";

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
  const {
    name = null,
    notes = null,
    parentId = null,
    status = "active",
  } = payload;

  if (parentId !== null && !isId(parentId)) {
    appError({
      code: "INVALID_PARENT_ID",
      message: "parentId must be null or an valid id",
      meta: { parentId },
    });
  }

  return {
    name,
    notes,
    parentId,
    status,
  };
}
