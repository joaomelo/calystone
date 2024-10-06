import { type Id, isId } from "./id";

export interface WithId { id: Id }

export function isWithId(maybeWithId: unknown): maybeWithId is WithId {
  if (typeof maybeWithId === "object" && maybeWithId !== null) {
    const object = maybeWithId as Record<string, unknown>;
    return "id" in object && isId(object.id);
  }
  return false;
}