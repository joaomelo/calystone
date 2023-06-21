export class Users {
  _users = new Map();

  get(id) {
    return this._users.get(id);
  }

  list() {
    return Array.from(this._users.values());
  }

  set(user) {
    this._users.set(user.id, user);
  }

  delete(id) {
    this._users.delete(id);
  }
}
