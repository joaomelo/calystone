import { Stateful } from "../../lib";

export class Projects extends Stateful {
  _projects = new Map();
  _collection;
  _auth;
  _community;

  constructor({ driver, auth, community }) {
    super();
    this._auth = auth;
    this._collection = driver.collection("projects", (user) => ({
      field: "users",
      op: "array-contains",
      value: user.uid,
    }));
    this._collection.subscribe((items) => this.load(items));
    this._community = community;
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

  usersOf(id) {
    const project = this.get(id);
    if (!project) return [];

    const users = project.users.map((userId) => this._community.get(userId));
    return users;
  }

  add(payload) {
    const payloadWithUser = {
      ...payload,
      users: [this._auth.userId],
    };
    return this._collection.add(payloadWithUser);
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
