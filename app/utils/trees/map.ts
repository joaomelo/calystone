import { type Tree, type TreeNode, type TreeNodeItem } from "./tree";

export function mapTree<
  Item extends TreeNodeItem,
  MappedItem extends TreeNodeItem
>(
  tree: Tree<Item>,
  mapItem: MapItem<Item, MappedItem>
): Tree<MappedItem> {
  return tree.map(node => mapNode(node, mapItem));
}

function mapNode<
  Item extends TreeNodeItem,
  MappedItem extends TreeNodeItem,
>(
  node: TreeNode<Item>,
  map: MapItem<Item, MappedItem>
): TreeNode<MappedItem> {
  const item = map(node.item);
  const children = node.children.map(child => mapNode(child, map));
  return { children, item };
}

type MapItem< Item extends TreeNodeItem, MappedItem extends TreeNodeItem> =
  (item: Item) => MappedItem;