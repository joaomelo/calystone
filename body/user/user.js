export class User {
  _id;
  _email;

  static service({ id, service }) {
    const { email } = service.data["users"].findWithId(id);
    return new User({ id, email });
  }

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
}
