import { v4, validate, version } from "uuid";

export type Id = { readonly brand: unique symbol } & string;

export function createId(): Id {
  return v4() as Id;
}

export function isId(maybeId: unknown): maybeId is Id {
  if (typeof maybeId !== "string") return false;
  if (!validate(maybeId)) return false;
  if (version(maybeId) !== 4) return false;
  return true;
}