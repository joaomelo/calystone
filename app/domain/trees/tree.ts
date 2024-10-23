export type Tree<Id, Item extends TreeNodeItem<Id>> = TreeNode<Id, Item>[];

export interface TreeNode<Id, Item extends TreeNodeItem<Id>> {
  children: TreeNode<Id, Item>[];
  item: Item;
}

export interface TreeNodeItem<Id> {
  id: Id,
  parentId?: Id;
}

export function nodedify<Id, Item extends TreeNodeItem<Id>>(item: Item): TreeNode<Id, Item> {
  return {
    children: [],
    item
  };
}
