import type { ItemId, WithId } from "../data";

export type Treeable = WithId & {
  parentId?: ItemId | null;
  [key: string]: unknown;
};
