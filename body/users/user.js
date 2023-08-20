export class User {
  _id;
  _email;

  static mount({ userId, usersData }) {
    const userData = usersData.find(({ id }) => id === userId);
    return new User(userData);
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
