import type { ItemId } from "../data";

export type Treeable = {
  id: ItemId;
  parentId?: ItemId | null;
  [key: string]: unknown;
};
