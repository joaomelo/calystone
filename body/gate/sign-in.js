import { signIn as signInBase } from "@lib";

import { ignite } from "./ignite";

export async function signIn(dependencies, payload) {
  const { auth } = dependencies;
  await signInBase(auth, payload);
  await ignite(dependencies);
}
