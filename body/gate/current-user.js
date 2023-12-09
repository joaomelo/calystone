export function currentUser(dependencies) {
  const { auth } = dependencies;
  const { uid: id, email } = auth.user;
  return { id, email };
}
