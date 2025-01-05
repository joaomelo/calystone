import { v4 } from "uuid";

export type Id = string;

export function createId(): Id {
  return v4();
}

export function isId(maybeId: unknown): maybeId is Id {
  return typeof maybeId === "string";
}

export function asId(maybeId: unknown): Id {
  return isId(maybeId) ? maybeId : createId();
}