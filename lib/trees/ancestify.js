export function ancestify(list, descendentId) {
  const ancestry = [];

  const find = (itemId) => {
    const item = list.find(item => item.id === itemId);
    if (item) {
      ancestry.push(item);
      find(item.parentId);
    }
  };
  find(descendentId);

  return ancestry.reverse();
}
