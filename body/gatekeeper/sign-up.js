import { signUp as signUpBase } from "@lib";

import { ignite } from "./ignite";

export async function signUp(dependencies, payload) {
  const { auth } = dependencies;
  await signUpBase(auth, payload);
  await ignite(dependencies);
}
