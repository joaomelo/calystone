import { createId, extractId } from "@lib";

export function pack(method, payload) {
  if (!method || !payload)
    throw new Error(
      "To pack a manifest into a mutation an object with a method and a payload are required",
    );

  switch (method) {
    case "add":
      return add(payload);
    case "put":
      return put(payload);
    case "del":
      return del(payload);

    default:
      throw new Error(
        `The value "${method}" is not a valid method to pack a manifest into a mutation`,
      );
  }
}

function add(payload) {
  const id = createId();
  const at = new Date();
  return {
    id,
    createdAt: at,
    updatedAt: at,
    ...payload,
  };
}

function put(payload) {
  return {
    ...payload,
    updatedAt: new Date(),
  };
}

function del(payload) {
  return { id: extractId(payload) };
}
