import { User } from "../users";

export class Program {
  _id;
  _name;
  _notes;
  _archivedAt;
  _users;

  static mount({ programId, programsData, usersData }) {
    const { usersIds, ...programData } = programsData.find(
      ({ id }) => id === programId
    );
    const users = usersIds.map((userId) => User.mount({ userId, usersData }));
    return new Program({ users, ...programData });
  }

  constructor({ id, name, notes, archivedAt, users }) {
    this._id = id;
    this._name = name;
    this._notes = notes;
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
