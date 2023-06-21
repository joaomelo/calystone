export class User {
  _id;
  _email;
  _owner;
  _archivedAt = null;

  constructor({ id, email }) {
    this._id = id;
    this._email = email;
  }

  get id() {
    return this._id;
  }

  get email() {
    return this._email;
  }

  set email(value) {
    this._email = value;
  }
}
