import { type Tree, type TreeNode, type TreeNodeItem } from "./tree";

export function mapTree<
  Id, 
  Item extends TreeNodeItem<Id>, 
  MappedItem extends TreeNodeItem<Id>
>(
  tree: Tree<Id, Item>, 
  mapItem: MapItem<Id, Item, MappedItem> 
): Tree<Id, MappedItem> {
  return tree.map(node => mapNode(node, mapItem));
}

function mapNode<
  Id, 
  Item extends TreeNodeItem<Id>,
  MappedItem extends TreeNodeItem<Id>, 
>(
  node: TreeNode<Id, Item>,
  map: MapItem<Id, Item, MappedItem>
): TreeNode<Id, MappedItem> {
  const item = map(node.item);
  const children = node.children.map(child => mapNode(child, map));
  return { children, item };
}

type MapItem<
  Id, 
  Item extends TreeNodeItem<Id>, 
  MappedItem extends TreeNodeItem<Id>,
> = (item: Item) => MappedItem;