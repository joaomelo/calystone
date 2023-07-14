import { StatefulMap } from "../../lib";

export class Users extends StatefulMap {
  _collection;

  constructor(driver) {
    super();
    this._collection = driver.collection("users");
    this._collection.subscribe((items) => this.load(items));
  }

  getByEmail(email) {
    return this.find((user) => user.email === email);
  }

  add({ id, email }) {
    return this._collection.add({ id, email });
  }
}
