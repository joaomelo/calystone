export function getItem(selector, { id, name }) {
  const select = selector.get(name);
  return select.items.get(id);
}
