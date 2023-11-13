import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { validateEmail } from "./email";
import { validatePassword } from "./password";
import { AUTH_STATUSES } from "./statuses";

export class Auth {
  driver;
  status = AUTH_STATUSES.UNSOLVED;

  constructor(driver) {
    this.driver = driver;
    onAuthStateChanged(this.driver.auth, (user) => {
      this.status = user ? AUTH_STATUSES.SIGNED_IN : AUTH_STATUSES.SIGNED_OUT;
    });
  }

  get user() {
    return this.driver.auth.currentUser;
  }

  get userId() {
    return this.driver.auth.currentUser.uid;
  }

  async solve() {
    const user = await this.driver.auth.authStateReady();
    this.status = user ? AUTH_STATUSES.SIGNED_IN : AUTH_STATUSES.SIGNED_OUT;
    return this.status;
  }

  async signUp({ email, password }) {
    validateEmail(email);
    validatePassword(password);
    return createUserWithEmailAndPassword(this.driver.auth, email, password);
  }

  async signIn({ email, password }) {
    validateEmail(email);
    return signInWithEmailAndPassword(this.driver.auth, email, password);
  }

  async signOut() {
    return signOut(this.driver.auth);
  }
}
