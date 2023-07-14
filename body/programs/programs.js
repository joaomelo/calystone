import { StatefulMap } from "../../lib";

export class Programs extends StatefulMap {
  _collection;
  _auth;
  _users;

  constructor({ driver, auth, users }) {
    super();
    this._users = users;
    this._auth = auth;

    this._collection = driver.collection("programs", (user) => ({
      field: "users",
      op: "array-contains",
      value: user.uid,
    }));
    this._collection.subscribe((items) => this.load(items));
  }

  usersOf(id) {
    const program = this.get(id);
    if (!program) return [];

    const users = program.users.map((userId) => this._users.get(userId));
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
    const program = this.get(payload.id);
    return this._collection.set({
      ...program,
      ...payload,
    });
  }

  archive(id) {
    const program = this.get(id);
    return this._collection.set({
      ...program,
      archivedAt: new Date(),
    });
  }

  del(id) {
    return this._collection.del(id);
  }
}
