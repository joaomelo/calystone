import { type WithId } from "@lib/ids";

import { type TreeNode } from "./node";

export interface EmptyNode<T extends WithId> {
  children: TreeNode<T>[];
  value: undefined,
};

export function emptyNode<T extends WithId>(): EmptyNode<T> {
  return {
    children: [],
    value: undefined
  };
}