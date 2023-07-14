import { StatefulMap } from "../../lib";
import { INVITE_STATUSES } from "./statuses";

export class Invites extends StatefulMap {
  _collection;
  _auth;
  _users;

  constructor({ driver, auth, users }) {
    super();
    this._auth = auth;
    this._users = users;
    this._collection = driver.collection("invites");
    this._collection.subscribe((items) => this.load(items));
  }

  invite({ email, program }) {
    const from = this._auth.userId;

    const userTo = this._users.getByEmail(email);
    const to = userTo.id;

    const status = INVITE_STATUSES.OPEN;

    return this._collection.add({ from, to, program, status });
  }
}
