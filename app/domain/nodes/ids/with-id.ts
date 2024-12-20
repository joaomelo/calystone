import { isObjectLike } from "@/domain/lang";

import { type Id, isId } from "./id";

export interface WithId { id: Id }

export function isWithId(maybeWithId: unknown): maybeWithId is WithId {
  if (!isObjectLike(maybeWithId)) return false;
  const object = maybeWithId as Record<string, unknown>;
  return "id" in object && isId(object.id);
}