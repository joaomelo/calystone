export function listItems(selector, name) {
  const select = selector.get(name);
  return Array.from(select.items.values());
}
