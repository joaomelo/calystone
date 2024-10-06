import { type Id, isId, type WithId } from "@lib/ids";

import { type EmptyNode, emptyNode } from "./empty";
import { nodedify, type TreeNode } from "./node";

export function treeify<T extends WithId>(items: Map<Id, T>): TreeNode<T>[] {
  const lookup: Record<Id, EmptyNode<T> | TreeNode<T>> = {};
  const tree: TreeNode<T>[] = [];

  items.forEach((item, id) => {
    // make sure that treeable item is present at the lookup table. it could be created before by a children node, so we make sure not to loose any saved data.
    if (!lookup[id]) lookup[id] = emptyNode();
    
    lookup[id].value = item;
    const node = nodedify(item);

    if ("parentId" in item && isId(item.parentId)) {
      const { parentId } = item;
      if (!lookup[parentId]) lookup[parentId] = emptyNode();
      lookup[parentId].children.push(node);
    }
    else {
      tree.push(node);
    }
  });

  return tree;
}
