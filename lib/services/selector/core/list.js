list(predicate) {
  const list = Array.from(this.items.values());
  if (!predicate) return list;
  return list.filter(predicate);
}