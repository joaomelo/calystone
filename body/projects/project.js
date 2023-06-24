export class Project {
  _id;
  _name;
  _owner;
  _archivedAt = null;

  constructor({ id, name, archivedAt, owner }) {
    this._id = id;
    this._name = name;
    this._owner = owner;
    this._archivedAt = archivedAt;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get archived() {
    return !!this._archivedAt;
  }
}
