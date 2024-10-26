export type Tree<Item extends TreeNodeItem> = TreeNode<Item>[];

export interface TreeNode<Item extends TreeNodeItem> {
  children: TreeNode<Item>[];
  item: Item;
}

export type TreeNodeItem = object;

export function nodedify<Item extends TreeNodeItem>(item: Item): TreeNode<Item> {
  return {
    children: [],
    item
  };
}
