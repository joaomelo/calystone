import { v4 as uuid } from "uuid";
import { Stateful } from "../../lib";
import { AUTH_STATUSES } from "./statuses";

export class Auth extends Stateful {
  _status = AUTH_STATUSES.UNSOLVED;
  _userId = uuid();

  constructor() {
    super();
    setTimeout(() => this.signOut(), 1000);
  }

  get status() {
    return this._status;
  }

  get signedIn() {
    return this._status === AUTH_STATUSES.SIGNED_IN;
  }

  get userId() {
    return this._userId;
  }

  signIn() {
    this._status = AUTH_STATUSES.SIGNED_IN;
    this.notify();
  }

  signOut() {
    this._status = AUTH_STATUSES.SIGNED_OUT;
    this.notify();
  }
}
