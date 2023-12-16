export function getItem(selector, { name, id }) {
  const select = selector.get(name);
  return select.items.get(id);
}
