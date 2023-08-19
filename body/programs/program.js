import { User } from "../user";

export class Program {
  _programsDataset;

  _id;
  _name;
  _notes;
  _archivedAt;
  _users;

  constructor({ id, service }) {
    this._programsDataset = service.data.programs;

    const { name, notes, archivedAt, usersIds } =
      this._programsDataset.findWithId(id);

    this._id = id;
    this._name = name;
    this._notes = notes;
    this._archivedAt = archivedAt;
    this._users = usersIds.map(({ id }) => new User({ id, service }));
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get archivedAt() {
    return this._archivedAt;
  }

  get isArchived() {
    return !!this._archivedAt;
  }

  get users() {
    return this._users;
  }

  addUser(user) {
    const currentUsersIds = this._users.map(({ id }) => id);
    const usersIds = [user.id, ...currentUsersIds];
    this._programsDataset.set({ id: this._id, usersIds });
  }

  edit(payload) {
    return this._programsDataset.set({ id: this._id, ...payload });
  }

  archive() {
    this._programsDataset.set({
      id: this._id,
      archivedAt: new Date(),
    });
  }

  unarchive() {
    this._programsDataset.set({
      id: this._id,
      archivedAt: null,
    });
  }
}
