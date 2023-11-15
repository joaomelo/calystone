import { extractId } from "./ids";

export function createIsChildOf(parentOrParentId) {
  const parentId = extractId(parentOrParentId);
  return (item) => item.parentId === parentId;
}
