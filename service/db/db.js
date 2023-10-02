import { computed, reactive } from "vue";
import { v4 as uuid } from "uuid";
import { asArray } from "@shared";
import { createPlugin } from "./factory";

export class Db {
  _collections = new Map();
  _plugin;

  constructor(options) {
    this._plugin = createPlugin(options);
  }

  _collection(name) {
    if (!this._collections.has(name))
      this._collections.set(name, reactive(new Map()));
    return this._collections.get(name);
  }

  async open(connection) {
    this._collections.clear();
    const initialData = await this._plugin.open(connection, this._collections);
    Object.entries(initialData).forEach(([name, items]) => {
      const collection = this._collection(name);
      items.forEach((item) => collection.set(item.id, item));
    });
  }

  async close() {
    await this._plugin.close();
    this._collections.clear();
  }

  async add(name, payload) {
    const item = {
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...payload,
    };

    const collection = this._collection(name);
    collection.set(item.id, item);

    await this._plugin.add(name, item);

    return item;
  }

  async edit(name, payload) {
    const collection = this._collection(name);
    const current = collection.get(payload.id);

    const item = {
      ...current,
      ...payload,
      updatedAt: new Date(),
    };
    collection.set(item.id, item);

    await this._plugin.edit(name, item);

    return item;
  }

  async del(name, payload) {
    const itemsOrIds = asArray(payload);

    const collection = this._collection(name);
    const promises = itemsOrIds.map((itemOrId) => {
      const id = itemOrId?.id || itemOrId;
      return collection.delete(id);
    });

    await Promise.all(promises);

    return itemsOrIds;
  }

  select(name, filter) {
    return computed(() => {
      const list = Array.from(this._collection(name).values());
      if (!filter) return list;
      return list.filter(filter);
    });
  }

  selectOne(name, find) {
    return computed(() => {
      const list = Array.from(this._collection(name).values());
      if (!find) return null;
      return list.find(find);
    });
  }
}
