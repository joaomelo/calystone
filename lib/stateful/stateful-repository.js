import { Stateful } from "./stateful";

export class StatefulRepository extends Stateful {
  _map = new Map();

  load(items) {
    this._map.clear();
    items.forEach((item) => this._map.set(item.id, item));
    this.notify();
  }

  list() {
    return Array.from(this._map.values());
  }

  get(id) {
    return this._map.get(id);
  }

  find(fn) {
    return this.list().find(fn);
  }

  filter(fn) {
    return this.list().filter(fn);
  }
}
