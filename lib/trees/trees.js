export function isRoot(item) {
  return !item.parentId;
}

export function treeify(list, config = {}) {
  const defaultIsRoot = isRoot;
  const isRootFinal = config.isRoot || defaultIsRoot;

  const defaultMap = (item) => item;
  const map = config.map || defaultMap;

  const lookup = {};

  const rootItems = list.reduce((acc, el) => {
    const children = lookup[el.id] ? lookup[el.id].children : [];
    lookup[el.id] = { ...map(el), children };

    if (isRootFinal(el)) {
      acc.push(lookup[el.id]);
      return acc;
    }

    if (!lookup[el.parentId]) {
      lookup[el.parentId] = { children: [] };
    }
    lookup[el.parentId].children.push(lookup[el.id]);
    return acc;
  }, []);

  return rootItems;
}

export function flatTree(tree, config = {}) {
  const defaultMap = (item) => item;
  const map = config.map || defaultMap;

  const set = new Set();

  const add = (items) => {
    items.forEach(({ children = [], ...item }) => {
      set.add(map(item));
      add(children);
    });
  };

  add(tree);

  return Array.from(set.values());
}
