export class Shepherd {
  _usersDataset;

  constructor({ usersDataset }) {
    this._usersDataset = usersDataset;
  }

  async enroll({ id, email }) {
    await this._usersDataset.firstLoad;

    const user = this._usersDataset.findWithId(id);
    if (user) return;

    return this._usersDataset.add({ id, email });
  }
}
