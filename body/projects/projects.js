import { Stateful } from "../../lib";

export class Projects extends Stateful {
  _projects = new Map();
  _collection;

  constructor(driver) {
    super();
    this._collection = driver.collection("projects", (user) => ({
      field: "users",
      op: "array-contains",
      value: user.uid,
    }));
    this._collection.subscribe((items) => this.load(items));
  }

  load(items) {
    this._projects.clear();
    items.forEach((item) => this._projects.set(item.id, item));
    this.notify();
  }

  get(id) {
    return this._projects.get(id);
  }

  list() {
    return Array.from(this._projects.values());
  }

  add(payload) {
    return this._collection.add(payload);
  }

  edit(payload) {
    const project = this.get(payload.id);
    return this._collection.set({
      ...project,
      ...payload,
    });
  }

  archive(id) {
    const project = this.get(id);
    return this._collection.set({
      ...project,
      archivedAt: new Date(),
    });
  }

  del(id) {
    return this._collection.del(id);
  }
}
