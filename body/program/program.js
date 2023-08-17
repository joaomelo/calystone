import { User } from "../user";

export class Program {
  _id;
  _name;
  _archivedAt;
  _users;

  service({ id, service }) {
    const { name, archivedAt, usersIds } =
      service.data["programs"].findWithId(id);

    this._id = id;
    this._name = name;
    this._archivedAt = archivedAt;
    this._users = usersIds.map(({ id }) => User.service({ id, service }));
  }

  constructor({ id, name, archivedAt, users }) {
    this._id = id;
    this._name = name;
    this._archivedAt = archivedAt;
    this._users = users;
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
}
