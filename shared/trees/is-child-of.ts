import type { Ideable } from "../data";
import type { Treeable } from "./treeable";

import { extractId } from "../data";

export function createIsChildOf(parentOrParentId: Ideable) {
  const parentId = extractId(parentOrParentId);
  return (treeable: Treeable) => treeable.parentId === parentId;
}
