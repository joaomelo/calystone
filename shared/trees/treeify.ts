import type { Node } from "./node";
import type { Treeable } from "./treeable";

export function treeify(list: Treeable[]) {
  const lookup: Record<string, Node> = {};

  const rootItems = list.reduce((acc, treeable) => {
    // make sure that treeable item is present at the lookup table. it could be created before by a children node, so we make sure to not loose any saved data.
    if (!lookup[treeable.id]) {
      lookup[treeable.id] = {
        children: [],
      };
    }

    // fill the node with the item full data representation
    const node = lookup[treeable.id];
    Object.assign(node, treeable);

    if (treeable.parentId) {
      // make sure its parent is present at the lookup table
      if (!lookup[treeable.parentId])
        lookup[treeable.parentId] = { children: [] };

      const parent = lookup[treeable.parentId];
      // adds itself to parent children list
      parent.children.push(node);
    } else {
      // is a parent node
      acc.push(node);
    }

    return acc;
  }, [] as Node[]);

  return rootItems;
}
