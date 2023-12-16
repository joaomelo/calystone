import { validateEmail } from "./email";
import { validatePassword } from "./password";

export async function signUp(auth, { email, password }) {
  validateEmail(email);
  validatePassword(password);
  await auth.signUp({ email, password });
}
