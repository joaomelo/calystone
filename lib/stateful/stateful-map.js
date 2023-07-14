import { Stateful } from "./stateful";

export class StatefulMap extends Stateful {
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
}
