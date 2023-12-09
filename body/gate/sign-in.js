import { ignite } from "./ignite";

export async function signIn(dependencies, payload) {
  const { auth } = dependencies;
  await auth.signIn(payload);
  await ignite(dependencies);
}
