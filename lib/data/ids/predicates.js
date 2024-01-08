import { validate, version } from "uuid";

import { extractId } from "./extract";

export function isId(maybeId) {
  return validate(maybeId) && version(maybeId) === 4;
}

export function createIsChildOf(parentOrParentId) {
  const parentId = extractId(parentOrParentId);
  return item => item.parentId === parentId;
}

export function createIsId(source) {
  const sourceId = extractId(source);
  return (target) => {
    const targetId = extractId(target);
    return sourceId === targetId;
  };
}
