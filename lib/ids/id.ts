import { v4, validate, version } from "uuid";

export type Id = { readonly brand: unique symbol } & string;

export function createId(): Id {
  return v4() as Id;
}

export function isId(maybeId: unknown): maybeId is Id {
  return typeof maybeId === "string" && validate(maybeId) && version(maybeId) === 4;
}