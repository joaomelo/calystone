export function validate(payload) {
  const { usersIds } = payload;
  if (!Array.isArray(usersIds) || usersIds.length === 0)
    throw new Error(
      "every artifact must have at least one user with access to id"
    );

  return {
    name: null,
    notes: null,
    parentId: null,
    status: "active",
    ...payload,
  };
}
