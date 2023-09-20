import { v4 as uuid } from "uuid";

export function add({ collection, payload }) {
  const item = {
    id: uuid(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...payload,
  };
  collection.set(item.id, item);
  return item;
}
