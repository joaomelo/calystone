export class User {
  _usersDataset;

  _id;
  _email;

  constructor({ id, service }) {
    this._usersDataset = service.data.users;

    const { email } = this._usersDataset.findWithId(id);

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
