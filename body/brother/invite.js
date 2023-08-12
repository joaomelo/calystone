export function mountInvites({ invites = [], users = [], programs = [] }) {
  if (invites.length === 0) return [];
  if (programs.length === 0) return [];
  if (users.length === 0) return [];

  const items = invites.map((rawItem) => {
    const { toUserId, fromUserId, programId, ...rest } = rawItem;
    const toUser = users.find((user) => user.id === toUserId);
    const fromUser = users.find((user) => user.id === fromUserId);
    const program = programs.find((program) => program.id === programId);
    return {
      ...rest,
      program,
      toUser,
      fromUser,
    };
  });

  return items;
}
