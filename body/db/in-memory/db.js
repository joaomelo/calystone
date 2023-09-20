import { add } from "./add";
import { del } from "./del";
import { edit } from "./edit";

export class InMemoryDb {
  collections = new Map();

  _collection(name) {
    if (!this.collections.has(name)) this.collections.set(name, new Map());
    return this.collections.get(name);
  }

  load() {
    this.collections.clear();
  }

  add({ name, payload }) {
    const collection = this._collection(name);
    return add({ collection, payload });
  }

  edit({ name, payload }) {
    const collection = this._collection(name);
    return edit({ collection, payload });
  }

  del({ name, payload }) {
    const collection = this._collection(name);
    return del({ collection, payload });
  }

  select(name) {
    return this._collection(name).values();
  }
}
