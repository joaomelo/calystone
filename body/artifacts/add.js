import { nextOrder } from "./order";

export function parseAdd(payload, list) {
  const {
    userId = this.gate.userId,
    name = null,
    notes = null,
    parentId = null,
    status = "active",
  } = payload;

  const order = nextOrder(parentId, list);

  return {
    userId,
    name,
    notes,
    parentId,
    status,
    order,
  };
}
