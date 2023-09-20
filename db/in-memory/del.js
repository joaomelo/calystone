import { asArray } from "@primitives";

export function del({ collection, payload }) {
  const itemsOrIds = asArray(payload);

  itemsOrIds.forEach((itemOrId) => {
    const id = itemOrId?.id || itemOrId;
    collection.delete(id);
  });
}
