export function parse(payload) {
  const {
    name = null,
    notes = null,
    parentId = null,
    status = "active",
  } = payload;

  return {
    name,
    notes,
    parentId,
    status,
  };
}
