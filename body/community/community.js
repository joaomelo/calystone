import { Stateful } from "../../lib";

export class Community extends Stateful {
  _community = new Map();
  _collection;

  constructor(driver) {
    super();
    this._collection = driver.collection("community");
    this._collection.subscribe((items) => this.load(items));
  }

  load(items) {
    this._community.clear();
    items.forEach((item) => this._community.set(item.id, item));
    this.notify();
  }

  get(id) {
    return this._community.get(id);
  }

  list() {
    return Array.from(this._community.values());
  }

  add({ id, email }) {
    return this._collection.add({ id, title: email });
  }
}
