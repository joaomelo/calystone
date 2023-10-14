import type { Node, Treeable, IsRoot, Map } from "./node";

import { isRoot as defaultIsRoot } from "./is-root";

type Options = {
  isRoot?: IsRoot;
  map?: Map;
};

export function treeify(list: Treeable[], options: Options = {}) {
  const isRoot = options.isRoot || defaultIsRoot;

  const defaultMap = (treeable: Treeable) => treeable;
  const map = options.map || defaultMap;

  const lookup: Record<string, Node> = {};

  const rootItems = list.reduce((acc, treeable) => {
    // make sure that treeable item is present at the lookup table. it could be created before by a children node, so we make sure to not loose the children property
    // is important to make sure id, parentId and children are present in the lookup because the map function could ignore those properties and the absence of that properties will break the algorithm
    if (!lookup[treeable.id]) {
      lookup[treeable.id] = {
        id: treeable.id,
        parentId: treeable.parentId || null,
        children: [],
      };
    }
    // fill the node it with the its proper data representation
    const node = lookup[treeable.id];
    Object.assign(node, map(treeable));

    if (node.parentId) {
      // make sure its parent is present at the lookup table
      if (!lookup[node.parentId]) {
        lookup[node.parentId] = { id: node.parentId, children: [] };
      }
      const parent = lookup[node.parentId];
      // adds itself to parent children list
      parent.children.push(node);
    }

    if (isRoot(node)) {
      acc.push(node);
    }

    return acc;
  }, [] as Node[]);

  return rootItems;
}
