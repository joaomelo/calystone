import { StatefulRepository } from "../../lib";

export class Shepherd extends StatefulRepository {
  _users;

  constructor(users) {
    super();
    this._users = users;
    this._users.subscribe((items) => this.load(items));
  }

  getByEmail(email) {
    return this.find((user) => user.email === email);
  }

  enroll({ id, email }) {
    const user = this.findById(id);
    if (user) return;
    return this._users.add({ id, email });
  }
}
