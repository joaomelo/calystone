import { validateEmail } from "./email";
import { validatePassword } from "./password";

export async function signIn(auth, { email, password }) {
  validateEmail(email);
  validatePassword(password);
  await auth.signIn({ email, password });
}
