import { delay } from "@primitives";
import { add } from "./add";
import { del } from "./del";
import { edit } from "./edit";

export class InMemoryDb {
  _collections = new Map();
  _loadDelay = null;

  constructor({ loadDelay = null } = {}) {
    this._loadDelay = loadDelay;
  }

  _collection(name) {
    if (!this._collections.has(name)) this._collections.set(name, new Map());
    return this._collections.get(name);
  }

  async open() {
    if (this._loadDelay) {
      await delay(this._loadDelay);
    }
    this._collections.clear();
  }

  close() {
    this._collections.clear();
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
