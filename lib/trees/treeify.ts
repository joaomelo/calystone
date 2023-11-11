import type { ItemId } from "@lib/data";
import type { Node } from "./node";
import type { Treeable } from "./treeable";

export function treeify(list: Treeable[]) {
  const lookup: Record<ItemId, Node> = {};
  const tree: Node[] = [];

  list.forEach((treeable) => {
    // make sure that treeable item is present at the lookup table. it could be created before by a children node, so we make sure to not loose any saved data.
    if (!lookup[treeable.id]) {
      lookup[treeable.id] = {
        children: [],
      };
    }

    // fill the node with with the provided data
    const node = lookup[treeable.id];
    Object.assign(node, treeable);

    if (treeable.parentId) {
      if (!lookup[treeable.parentId])
        lookup[treeable.parentId] = { children: [] };
      const parent = lookup[treeable.parentId];
      parent.children.push(node);
    } else {
      // is a parent node
      tree.push(node);
    }
  });

  return tree;
}
