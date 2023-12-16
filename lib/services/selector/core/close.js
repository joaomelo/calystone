export async function closeSelect(selector, name) {
  const select = selector.get(name);
  if (!select) return;

  select.isOpen = false;
  select.items.clear();
  select.unsubscribe();
}
