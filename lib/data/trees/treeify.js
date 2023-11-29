import { extractId } from "@lib/data/ids";

export function treeify(list, options = {}) {
  const lookup = {};
  const tree = [];

  const map = options.map || defaultMap;

  const isRoot = options.isRoot || defaultIsRoot;

  list.forEach((item) => {
    const id = extractId(item);

    // make sure that treeable item is present at the lookup table. it could be created before by a children node, so we make sure not to loose any saved data.
    if (!lookup[id]) lookup[id] = emptyNode();

    // fill the node with with the provided data
    const node = lookup[id];
    Object.assign(node, map(item));

    if (isRoot(item)) {
      tree.push(node);
    } else {
      const { parentId } = item;
      if (!lookup[parentId]) lookup[parentId] = emptyNode();
      const parent = lookup[parentId];
      parent.children.push(node);
    }
  });

  return tree;
}

function defaultMap(i) {
  return i;
}

function defaultIsRoot(i) {
  return !i.parentId;
}

function emptyNode() {
  return {
    children: [],
  };
}
