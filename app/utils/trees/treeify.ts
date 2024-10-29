import { nodedify, type Tree, type TreeNode } from "./tree";

export function treeify<Id, Item extends InputItem<Id>>(items: Map<Id, Item>): Tree<Item> {
  const lookup = new Map<Id, TreeNode<Item>>();
  const tree: Tree<Item> = [];

  items.forEach((item, id) => {
    const node = assertNode(id, item);

    const { parentId } = item;
    if (parentId === undefined) {
      tree.push(node);
    }
    else {
      const parentItem = items.get(parentId);
      if (!parentItem) throw new Error("parent item not found in items input");
      const parentNode = assertNode(parentId, parentItem);
      parentNode.children.push(node);
    }
  });

  return tree;

  function assertNode(id: Id, value: Item) {
    const maybeNode = lookup.get(id);
    if (maybeNode) {
      return maybeNode;
    } else {
      const node = nodedify<Item>(value);
      lookup.set(id, node);
      return node;
    }
  }
}

interface InputItem<Id> {
  id: Id,
  parentId?: Id;
}