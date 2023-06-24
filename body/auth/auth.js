import { Stateful } from "../../lib";
import { AUTH_STATUSES } from "./statuses";
import { validateEmail, validatePassword } from "./validation";

export class Auth extends Stateful {
  _status = AUTH_STATUSES.UNSOLVED;
  _user = null;
  _driver;

  constructor({ driver }) {
    super();
    this._driver = driver;

    this._driver.subscribe((user) => {
      this._status = user ? AUTH_STATUSES.SIGNED_IN : AUTH_STATUSES.SIGNED_OUT;
      this._user = user;
      this.notify();
    });
  }

  get status() {
    return this._status;
  }

  get signedIn() {
    return this._status === AUTH_STATUSES.SIGNED_IN;
  }

  get userId() {
    return this._user.uid;
  }

  signUp(credentials) {
    const { email, password } = credentials;
    validateEmail(email);
    validatePassword(password);
    return this._driver.signUp(credentials);
  }

  signIn(credentials) {
    const { email } = credentials;
    validateEmail(email);
    return this._driver.signIn(credentials);
  }

  signOut() {
    return this._driver.signOut();
  }
}
