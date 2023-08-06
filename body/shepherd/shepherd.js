import { Stateful } from "../../lib";

export class Shepherd extends Stateful {
  _users;

  constructor(users) {
    super();
    this._users = users;
    this._users.subscribe(() => this.notify());
  }

  listUsers() {
    return this._users.list();
  }

  findUserWithId(id) {
    return this._users.findWithId(id);
  }

  findUserWithEmail(email) {
    return this._users.find((user) => user.email === email);
  }

  enroll({ id, email }) {
    const user = this._users.findWithId(id);
    if (user) return;
    return this._users.add({ id, email });
  }
}
