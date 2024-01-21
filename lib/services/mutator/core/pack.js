import { createId, extractId } from "@lib";

export function pack(method, data) {
  if (!method || !data)
    throw new Error(
      "To pack a manifest into a mutation an object with a method and a payload are required",
    );

  switch (method) {
    case "add":
      return add(data);
    case "put":
      return put(data);
    case "del":
      return del(data);

    default:
      throw new Error(
        `The value "${method}" is not a valid method to pack a manifest into a mutation`,
      );
  }
}

function add(data) {
  const id = createId();
  const at = new Date();
  return {
    createdAt: at,
    id,
    updatedAt: at,
    ...data,
  };
}

function put(data) {
  return {
    ...data,
    updatedAt: new Date(),
  };
}

function del(data) {
  return { id: extractId(data) };
}
