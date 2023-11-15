import { asArray } from "@lib";

export function extractId(maybeId) {
  if (typeof maybeId === "string") return maybeId;

  if (typeof maybeId.id !== "string")
    throw new Error(
      "extractId expects a string or an object with an id field "
    );

  return maybeId.id;
}

export function extractIds(maybeIdOrIds) {
  return asArray(maybeIdOrIds).map(extractId);
}

export function createIsId(source) {
  const sourceId = extractId(source);
  return (target) => {
    const targetId = extractId(target);
    sourceId === targetId;
  };
}
