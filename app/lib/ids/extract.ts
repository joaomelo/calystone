import { asArray } from "@joaomelo/arrays";

import { type Id, isId } from "./id";
import { type WithId } from "./with-id";

type MaybeId = Id | WithId;

export function extractId(maybeId: MaybeId) {
  if (isId(maybeId)) return maybeId;
  return maybeId.id;
}

export function extractIds(maybeIdOrIds: MaybeId[]): Id[] {
  return asArray(maybeIdOrIds).map(extractId);
}
