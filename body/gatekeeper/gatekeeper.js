import { Stateful } from "../../lib";
import { GATEKEEPER_STATUSES } from "./statuses";
import { validateEmail, validatePassword } from "./validation";

export class Gatekeeper extends Stateful {
  _status = GATEKEEPER_STATUSES.UNSOLVED;
  _user = null;
  _auth;
  _shepherd;

  constructor({ auth, shepherd }) {
    super();
    this._auth = auth;
    this._shepherd = shepherd;

    this._auth.subscribe((user) => {
      this._status = user
        ? GATEKEEPER_STATUSES.SIGNED_IN
        : GATEKEEPER_STATUSES.SIGNED_OUT;
      this._user = user;
      this.notify();
    });
  }

  get status() {
    return this._status;
  }

  get signedIn() {
    return this._status === GATEKEEPER_STATUSES.SIGNED_IN;
  }

  get userId() {
    return this._user.uid;
  }

  async signUp(credentials) {
    const { email, password } = credentials;
    validateEmail(email);
    validatePassword(password);
    const { user } = await this._auth.signUp(credentials);
    return this._shepherd.enroll({ id: user.uid, email });
  }

  async signIn(credentials) {
    const { email } = credentials;
    validateEmail(email);
    const { user } = await this._auth.signIn(credentials);
    return this._shepherd.enroll({ id: user.uid, email });
  }

  signOut() {
    return this._auth.signOut();
  }
}
