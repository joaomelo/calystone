import type { ItemId } from "../data";

export type Treeable = {
  id: ItemId;
  parentId?: ItemId | null;
  [key: string]: unknown;
};

export type Node = Treeable & {
  children: Node[];
};

export type IsRoot = (treeable: Treeable) => boolean;
export type Map = (treeable: Treeable) => Treeable;
