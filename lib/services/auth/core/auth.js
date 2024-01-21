import { validateEmail } from "./email";
import { validatePassword } from "./password";

export class Auth {
  adapter;

  constructor(adapter) {
    this.adapter = adapter;
  }

  signIn({ email, password }) {
    validateEmail(email);
    validatePassword(password);
    return this.adapter.signIn({ email, password });
  }

  signOut() {
    return this.adapter.signOut();
  }

  signUp({ email, password }) {
    validateEmail(email);
    validatePassword(password);
    return this.adapter.signUp({ email, password });
  }

  solveStatus() {
    return this.adapter.solveStatus();
  }

  solveUser() {
    return this.adapter.solveUser();
  }
}
