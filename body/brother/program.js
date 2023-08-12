export function mountPrograms({ programs = [], users: allUsers = [] }) {
  if (programs.length === 0) return [];
  if (allUsers.length === 0) return [];

  const items = programs.map((rawItem) => {
    const { usersIds, ...rest } = rawItem;
    const users = usersIds.map((userId) =>
      allUsers.find((user) => user.id === userId)
    );
    return {
      ...rest,
      users,
    };
  });

  return items;
}
