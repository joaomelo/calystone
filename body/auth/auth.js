import { Stateful } from "../../lib";
import { AUTH_STATUSES } from "./statuses";
import { validateEmail, validatePassword } from "./validation";

export class Auth extends Stateful {
  _status = AUTH_STATUSES.UNSOLVED;
  _user = null;
  _driver;
  _community;

  constructor({ driver, community }) {
    super();
    this._driver = driver;
    this._community = community;

    this._driver.auth.subscribe((user) => {
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

  async signUp(credentials) {
    const { email, password } = credentials;
    validateEmail(email);
    validatePassword(password);
    const { user } = await this._driver.auth.signUp(credentials);
    return this._community.add({ id: user.uid, email });
  }

  signIn(credentials) {
    const { email } = credentials;
    validateEmail(email);
    return this._driver.auth.signIn(credentials);
  }

  signOut() {
    return this._driver.auth.signOut();
  }
}
