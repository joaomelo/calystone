import { asArray } from "@lib";

import { isId } from "./predicates";

export function extractId(maybeId) {
  if (isId(maybeId)) return maybeId;

  if (!isId(maybeId.id))
    throw new Error(
      "extractId expects a uuid string or an object with an uuid string in the id field ",
    );

  return maybeId.id;
}

export function extractIds(maybeIdOrIds) {
  return asArray(maybeIdOrIds).map(extractId);
}
