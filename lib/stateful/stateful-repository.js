import { Stateful } from "./stateful";

export class StatefulRepository extends Stateful {
  _items = new Set();

  load(items = []) {
    this._items = new Set(items);
    this.notify();
  }

  // if subclasses wish to build dynamic data relationships, this will be the method to override since every find and filter methods are based on it and not the raw data structure.
  list() {
    return Array.from(this._items.values());
  }

  findById(id) {
    return this.list().find((item) => item.id === id);
  }

  find(fn) {
    return this.list().find(fn);
  }

  filter(fn) {
    return this.list().filter(fn);
  }
}
