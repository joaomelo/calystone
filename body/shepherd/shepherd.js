export class Shepherd {
  constructor({ usersDataset }) {
    this._usersDataset = usersDataset;
  }

  enroll({ id, email }) {
    const user = this._users.findWithId(id);
    if (user) return;
    return this._users.add({ id, email });
  }
}
