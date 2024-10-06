import { type WithId } from "@lib/ids";


export interface TreeNode<T extends WithId> {
  children: TreeNode<T>[];
  value: T;
}

export function nodedify<T extends WithId>(item: T): TreeNode<T> {
  return {
    children: [],
    value: item
  };
}