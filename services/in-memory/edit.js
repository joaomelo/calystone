export function edit({ collection, payload }) {
  const current = collection.get(payload.id);
  const item = {
    ...current,
    ...payload,
    updatedAt: new Date(),
  };
  collection.set(payload.id, item);
  return item;
}
