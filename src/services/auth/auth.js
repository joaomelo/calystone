import { Stateful } from "../../lib";
import { AUTH_STATUSES } from "./statuses";

export class Auth extends Stateful {
  _status = AUTH_STATUSES.UNSOLVED;

  constructor() {
    super();
    setTimeout(() => this.signOut(), 5000);
  }

  get status() {
    return this._status;
  }

  signIn() {
    this._status = AUTH_STATUSES.SIGNED_IN;
    this.notify();
  }

  signOut() {
    this._status = AUTH_STATUSES.SIGNED_OUT;
    console.log("hi");
    this.notify();
  }
}
